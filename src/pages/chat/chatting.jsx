import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/chat/chatting.module.css';
import ChattingHeader from '../../components/chat/chattingHeader';
import ChattingMessages from '../../components/chat/chattingMessages';
import ChattingInputArea from '../../components/chat/chattingInputArea';
import mqtt from 'mqtt';
import ChattingList from 'components/chat/chattingList';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useStores } from '@/contexts/storeContext';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { getAllUsers } from 'api/user';


const Chatting = observer(({ closeChatting }) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    // const [userInfo, setUserInfo] = useState({
    //     username: '',
    //     email: '',
    //     profile: ''
    // });
    const [chatRoomList, setChatRoomList] = useState([]);

    const { authStore, userStore } = useStores();

    const [users, setUsers] = useState([]); //getAllUsers()

    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const [currentChatRoomId, setCurrentChatRoomId] = useState(null); // 현재 선택된 채팅방의 ID

    const getAllChatroomList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/chat/allChatroomList'); 
            // 그대로 갖고오지말고 user id (나의 id) 전달해서 chatroomUsers 테이블에서 chatroom_id로 접근. 가져와서 그 findByID(chatroom_id)
            setChatRoomList(response.data);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    };

    const getChatroomList = async () => {
        try {
            const userId = userStore.id;
            const response = await axios.post('http://localhost:8080/api/chat/userChatrooms', { userId });
            setChatRoomList(response.data);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    };

    const getUserList = async () => {
        try{
            const response = await getAllUsers();
            setUsers(response.data);
        } 
        catch (error) {
            console.log('error: ', error);
        }
    }


    useEffect(() => {
        //이전 채팅 로딩
        loadingPastChatting();

        //채팅방 목록 얻어오기
        //getAllChatroomList();
        getChatroomList();

        //모든 유저 목록 얻어오기
        getUserList();
    })


    useEffect(() => {
        if (currentChatRoomId && !client) {
            try {
                const mqttClient = mqtt.connect('mqtt://192.168.0.137:1884');
                
                mqttClient.on('connect', () => {
                    console.log('Connected to MQTT broker');
                    setIsConnected(true);
                    const topic = `python/mqtt/${currentChatRoomId}`; // 채팅방 ID에 따라 토픽 설정
                    mqttClient.subscribe(topic);
                });
    
                mqttClient.on('message', (topic, message) => {
                    console.log('Received message:', message.toString());
                    const receivedMessage = JSON.parse(message);
                    if (receivedMessage.sender !== userStore.username) {
                        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    }
                });
    
                mqttClient.on('error', (err) => {
                    console.error('Connection error:', err);
                });
    
                mqttClient.on('close', () => {
                    console.log('Disconnected from MQTT broker');
                    setIsConnected(false);
                });
    
                setClient(mqttClient);
    
                return () => {
                    if (mqttClient) {
                        mqttClient.end();
                    }
                };
            } catch (error) {
                console.log('mqtt.connect Error: ', error);
            }
        }
    }, [currentChatRoomId, client]);

    /*
    useEffect(() => {

        // mqtt 연결을 ChatMessage 쪽으로 옮기고 그곳에서 ChatroomList 안에 있는 id 값을 받아와서 그걸로 topic 설정해주기
        //topic을 chatroom의 id로 해주고 
        //chatroomList 도 다 출력하면 안되고 자기가 속해있는 ChatroomUsers 에서 판단... findByUserId...

        // MQTT 브로커에 연결
        try{
            const mqttClient = mqtt.connect('mqtt://192.168.0.137:1884'); // 또는 'ws://broker.hivemq.com:8000/mqtt' (웹소켓 사용 시)

            mqttClient.on('connect', () => {
                console.log('Connected to MQTT broker');
                setIsConnected(true);
                mqttClient.subscribe('python/mqtt'); // 토픽
            });
    
            mqttClient.on('message', (topic, message) => {
                console.log('Received message:', message.toString());
                if (topic === 'python/mqtt') {
    
                    const receivedMessage = JSON.parse(message);
                    if (message.sender !== userStore.username) {
                        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    }
    
                }
            });
    
            mqttClient.on('error', (err) => {
                console.error('Connection error:', err);
            });
    
            mqttClient.on('close', () => {
                console.log('Disconnected from MQTT broker');
                setIsConnected(false);
            });
    
            setClient(mqttClient);
    
            return () => {
                if (mqttClient) {
                    mqttClient.end();
                }
            };
        }
        catch (error) {
            console.log('mqtt.connect Error: ', error);
        }
        
        // ========================================================================================

        // const websocketClient = new WebSocket('ws://192.168.0.137:8081/mqtt');
        // setClient(websocketClient);

        // websocketClient.onopen = () => {
        //     console.log("WebSocket connection established");
        // };

        // websocketClient.onmessage = (event) => {
        //     const message = JSON.parse(event.data);
        //     console.log("Received WebSocket message: ", message);
        //     setMessages((prevMessages) => [...prevMessages, message]);
        // };

        // websocketClient.onclose = () => {
        //     console.log("WebSocket connection closed");
        // };

        // return () => websocketClient.close();

    }, []);
    */












    

    // const startNewBot = useCallback(async () => {
    //     try {
    //         const response = await axios.post('/api/bot/chat', null, {
    //             params: { id: tempId }
    //         });
    //         console.log("New chat started with ID:", response.data.botId);
    //         setCurrentBotId(response.data.botId);
    //         setBotStartTime(new Date(response.data.createdTime));
    //         setBotEndTime(null);

    //         const greetingMessage = "안녕하세요!";
    //         setMessages([{ text: greetingMessage, sender: 'bot' }]);
    //     } catch (error) {
    //         console.error('Error starting new chat:', error);
    //         setMessages([{ text: "채팅 시작 중 오류가 발생했습니다.", sender: 'system' }]);
    //     }
    // }, [tempId]);

    // const saveJsonFile = async () => {
    //     try {
    //         const data = {
    //             botId: currentBotId,
    //             messages: messages,
    //             startTime: botStartTime,
    //             endTime: new Date()
    //         };

    //         await axios.post('/api/bot/save-json', data);
    //         console.log('Chat data saved successfully');
    //     } catch (error) {
    //         console.error('Error saving chat data:', error);
    //     }
    // };


    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const onChatClick = (chatRoomId) => {
        setCurrentChatRoomId(chatRoomId); // 선택된 채팅방 ID 저장
        setIsChatOpen(true);
        //채팅 하나하나 각각 눌렀을때 ?

    };

    const handleBackClick = () => {
        setIsChatOpen(false);
    };

    const loadingPastChatting = () => {
        const pastMessages = [
            { text: '테스트용 첫 채팅', sender: '김길동', timestamp: new Date() },
        ]

        pastMessages.map((pastMessage, index) => (
            setMessages(prev => [...prev, pastMessage])
        ));
    }

    const sendMessage = async () => {
        if (inputMessage.trim()) {

            const userMessage = { text: inputMessage, sender: userStore.username };
            // setMessages(prev => [...prev, userMessage]);

            //client.publish('python/mqtt', JSON.stringify({ text: inputMessage, sender: userStore.username, timestamp: new Date() }));
            const topic = `python/mqtt/${currentChatRoomId}`;
            client.publish(topic, JSON.stringify({
                text: inputMessage,
                sender: userStore.username,
                timestamp: new Date()
            }));


            // client.send(JSON.stringify({ text: inputMessage, timestamp: new Date() }));

            // // Received
            // client.on('message', (topic, inputMessage, packet) => {
            //     console.log('Received Message: ' + inputMessage.toString() + '\nOn topic: ' + topic)
            // })

            // mqttClient.on('connect', () => {
            //     const topic = 'python/mqtt'
            //     mqttClient.subscribe(topic, (err) => {
            //         if (!err) {
            //             mqttClient.publish('python/mqtt', JSON.stringify(userMessage))
            //         }
            //     });
            // });

            // MQTT를 통해 메시지 전송
            // mqttClient.publish('python/mqtt', JSON.stringify(userMessage), (err) => {
            //     if (err) {
            //         console.error('MQTT publish error:', err);
            //     } else {
            //         console.log('Message sent to python/mqtt');
            //     }
            // });

            setInputMessage('');
            try {
                // const questionResponse = await axios.post('/api/bot/question', {
                //     content: inputMessage,
                //     botId: currentBotId
                // });

                // const answerResponse = await axios.post('/api/bot/answer', null, {
                //     params: { questionId: questionResponse.data.questionId }
                // });

                // const newBotMessage = {
                //     text: answerResponse.data.content,
                //     sender: 'bot',
                //     answerId: answerResponse.data.answerId
                // };



                if (inputMessage == '지금')
                    setMessages(prev => [...prev, { text: '상대방의 메세지', sender: 'kim' }]);
            } catch (error) {
                console.error('Error processing message:', error);
                setMessages(prev => [...prev, { text: "죄송합니다. 오류가 발생했습니다.", sender: 'kim' }]);
            }
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };


    return (
        <div className={`${styles.atchatWrapper} ${isDarkMode ? `${styles.darkMode}` : ''}`}>

            <div className={`${styles.chatContainer} ${isDarkMode ? styles.darkMode : ''}`}>
                <ChattingHeader closeChatting={closeChatting} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <div className={styles.chatContent}>

                    {!isChatOpen ? (
                        <ChattingList 
                            chatRoomList={chatRoomList} 
                            onChatClick={onChatClick} 
                            userStore={userStore} 
                            users={users}
                            getAllChatroomList={getAllChatroomList} />
                    ) : (
                        <>
                            <div className={styles.chattingBackButtonWrapper}>
                                <button className={styles.chattingBackButton} onClick={handleBackClick}>
                                    <ArrowBackIosNewRoundedIcon />
                                </button>
                            </div>
                            <ChattingMessages messages={messages} userStore={userStore} />
                        </>



                    )}
                </div>
                {isChatOpen && (
                    <div className={styles.inputArea}>
                        <ChattingInputArea
                            inputMessage={inputMessage}
                            setInputMessage={setInputMessage}
                            sendMessage={sendMessage}
                            handleKeyPress={handleKeyPress}
                        />
                    </div>
                )}
            </div>

        </div>
    );
});

export default Chatting;

