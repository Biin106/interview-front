// BbsRegisterPage.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid, Button, TextField, Select, MenuItem, IconButton, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import sidebar from '@/styles/bbs/bbsPage.module.css';
import styles from '@/styles/bbs/bbsCreatePost.module.css';

import { useStores } from '@/contexts/storeContext';
import { observer } from 'mobx-react-lite';

const BbsRegister = observer(() => {
    const router = useRouter();
    const { authStore, userStore } = useStores();
    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 내용 상태
    const [files, setFiles] = useState([]); // 파일 상태
    const [fileNames, setFileNames] = useState([]);
    const [fontSize, setFontSize] = useState(15);
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontWeight, setFontWeight] = useState('normal');
    const [textDecoration, setTextDecoration] = useState('none');
    const [textAlign, setTextAlign] = useState('left');
    const id = userStore.id;

    const handleFontSizeChange = (e) => setFontSize(e.target.value);
    const toggleFontStyle = () => setFontStyle(fontStyle === 'normal' ? 'italic' : 'normal');
    const toggleFontWeight = () => setFontWeight(fontWeight === 'normal' ? 'bold' : 'normal');
    const toggleTextDecoration = () => setTextDecoration(textDecoration === 'none' ? 'underline' : 'none');
    const handleTextAlign = (align) => setTextAlign(align);
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        setFileNames(selectedFiles.map(file => file.name));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('id', id);
        files.forEach(file => {
            formData.append('files', file); // 여러 파일 추가
        });
        try {
            const response = await axios.post('http://localhost:8080/bbs', formData);
            router.push('/bbs/bbsPage');
        } catch (error) {
            console.error('게시글 등록 실패:', error);
        }
    };
    
    

    return (
        <div className={sidebar.container}>
            
            <div className={sidebar.content}>
                <div className={styles['CreatePostbbsRegisterContainer']}>
                    <h2 className={styles['CreatePostbbsRegisterTitle']}>자유 게시판</h2>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>글 작성하기</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="제목을 입력하세요"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                           
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="내용을 입력하세요"
                                    onChange={(e) => setContent(e.target.value)}
                                    multiline
                                    rows={8}
                                    style={{
                                        fontSize: `${fontSize}px`,
                                        fontStyle: fontStyle,
                                        fontWeight: fontWeight,
                                        textDecoration: textDecoration,
                                        textAlign: textAlign,
                                    }}
                                />
                                <Typography variant="body2" align="right" color="textSecondary">0/2000</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<AttachFileIcon />}
                                        >
                                            파일첨부
                                            <input type="file" hidden multiple onChange={handleFileChange}/>
                                        </Button>
                                        {fileNames.length > 0 && (
                                            <Typography variant="body2" color="textSecondary">
                                                첨부된 파일: {fileNames.join(', ')}
                                            </Typography>
                                        )}
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" className={styles['submit-button']}>등록</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default BbsRegister;
