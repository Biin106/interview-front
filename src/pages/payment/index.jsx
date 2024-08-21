import styles from '@/styles/main.module.css';
import { Icon } from '@mui/material';
const Payment = () => {
    return (
        <>
            <div>

                {/* 요금제 섹션들 */}
                <div className={styles.container4} id="tickets">
                    <div className={styles.ticketheader}>플랜 안내</div>
                    <div className={styles.ticketSubheader}>“ 합리적인 가격에 확실한 결과를 볼 수 있는 기회 ”</div>

                    {/*  */}
                    <div className={styles.ticketplansFrame}>

                        <div className={styles.ticketplansFrameIn}>
                            <div className={styles.ticketplansFrames}>
                                <div className={styles.tickettitle}>무료</div>
                                <div className={styles.ticketInfo}>
                                    <div className={styles.ticketInfoIn}>
                                        <div className={styles.ticketInfoTitle}>평가 항목</div>
                                        <div>전체 등급</div>
                                        <div>총합 평가</div>
                                        <div>추천 지수</div>
                                        <div>평가 항목별 점수</div>
                                    </div>
                                </div>
                                <div className={styles.ticketButtonFrame}>
                                    <a href='#' className={styles.ticketbutton}>가입하기</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.ticketplansFrameIn}>
                            <div className={styles.ticketplansFrames}>
                                <div className={styles.tickettitle}>베이직</div>
                                <div className={styles.ticketInfo}>
                                    <div className={styles.ticketInfoIn}>
                                        <div className={styles.ticketInfoTitle}>무료 플랜 평가에 추가로 아래기능들을 더 제공합니다</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />성격 특성</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />성격 분석</div>
                                    </div>
                                </div>
                                <div className={styles.ticketButtonFrame}>
                                    <div>1,000 원</div>
                                    <a href='#' className={styles.ticketbutton}>결제하기</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.ticketplansFrameIn}>
                            <div className={styles.ticketplansFrames}>
                                <div className={styles.tickettitle}>프리미엄</div>
                                <div className={styles.ticketInfo}>
                                    <div className={styles.ticketInfoIn}>
                                        <div className={styles.ticketInfoTitle}>베이직 플랜 평가에 추가로 아래기능들을 더 제공합니다</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />시선 처리</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />표정 분석</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />음성 분석</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />키워 드분석</div>
                                        <div className={styles.ticketInfoTitleSub}><Icon
                                            baseClassName="fas"
                                            className="fa-plus-circle"
                                            sx={{ color: '#5A8AF2', fontSize: 16 ,marginRight:'5px'}}
                                        />답변시간 분석</div>
                                    </div>
                                </div>
                                <div className={styles.ticketButtonFrame}>
                                    <div>10,000 원</div>
                                    <a href='#' className={styles.ticketbutton}>결제하기</a>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    );
};
export default Payment;