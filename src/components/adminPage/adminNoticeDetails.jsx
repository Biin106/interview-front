import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography
} from '@mui/material';
import styles from '@/styles/adminPage/adminNoticeDetails.module.css'; // 모듈 스타일을 import

const AdminNoticeDetails = ({ noticeData, onSave, onDelete, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNotice, setEditedNotice] = useState(noticeData);

    // 삭제 버튼 클릭 핸들러
    const handleDelete = () => {
        setOpen(true);
    };

    // 삭제 확인 핸들러
    const handleConfirmDelete = () => {
        setOpen(false);
        onDelete();
    };

    // 삭제 취소 핸들러
    const handleCancelDelete = () => {
        setOpen(false);
    };

    // 수정 버튼 클릭 핸들러
    const handleEdit = () => {
        setIsEditing(true);
    };

    // 수정 완료 버튼 클릭 핸들러
    const handleSave = () => {
        setIsEditing(false);
        onSave(editedNotice);
    };

    // 입력 필드 값 변경 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedNotice(prevNotice => ({
            ...prevNotice,
            [name]: value
        }));
    };

    // 공지사항 헤더 렌더링
    const renderHeader = () => (
        <div className={styles.adminNoticeDetailsHeader}>
            {isEditing ? (
                <TextField
                    fullWidth
                    variant="outlined"
                    label="제목"
                    name="title"
                    value={editedNotice.title}
                    onChange={handleChange}
                />
            ) : (
                <h2>{editedNotice.title}</h2>
            )}
            <p className={styles.adminNoticeDetailsDate}>{editedNotice.date}</p>
        </div>
    );

    // 공지사항 내용 렌더링
    const renderContent = () => (
        <div className={styles.adminNoticeDetailsContent}>
            {isEditing ? (
                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={10}
                    label="내용"
                    name="content"
                    value={editedNotice.content}
                    onChange={handleChange}
                />
            ) : (
                editedNotice.content
            )}
        </div>
    );

    // 공지사항 버튼 렌더링
    const renderButtons = () => (
        <div className={styles.adminNoticeDetailsButtonsContainer}>
            {isEditing ? (
                <Button variant="contained" color="primary" className={styles.adminNoticeSaveButton} onClick={handleSave}>
                    저장하기
                </Button>
            ) : (
                <Button variant="contained" className={styles.adminNoticeEditButton} onClick={handleEdit}>
                    수정하기
                </Button>
            )}
            <Button variant="contained" className={styles.adminNoticeDeleteButton} onClick={handleDelete}>
                삭제하기
            </Button>
        </div>
    );

    return (
        <div className={styles.adminNoticeDetailsContainer}>
            <Paper elevation={3} className={styles.adminNoticeDetailsPaper}>
                <Typography variant="h6" gutterBottom className={styles.adminNoticeDetailsDate}>
                    [전체 공지사항]
                </Typography>
                {renderHeader()}
                {renderContent()}
                {renderButtons()}

                {/* 삭제 확인 다이얼로그 */}
                <Dialog open={open} onClose={handleCancelDelete}>
                    <DialogTitle className={styles.adminNoticeDialogTitle}>공지사항 삭제</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={styles.adminNoticeDialogContentText}>
                            공지사항을 삭제하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                            취소
                        </Button>
                        <Button onClick={handleConfirmDelete} color="secondary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* 이전글 / 다음글 기능 */}
                <div className={styles.adminNoticeNavButtons}>
                    <Button>&lt; 이전글</Button>
                    <Button>다음글 &gt;</Button>
                </div>
            </Paper>
        </div>
    );
};

export default AdminNoticeDetails;