import React, { useState } from 'react';
import { Grid, Button, TextField, Select, MenuItem, IconButton, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styles from '@/styles/adminPage/adminAdminNoticeRegister.module.css'; // 모듈 스타일을 import

const AdminAdminNoticeRegister = () => {
    const [fontSize, setFontSize] = useState(15);
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontWeight, setFontWeight] = useState('normal');
    const [textDecoration, setTextDecoration] = useState('none');
    const [textAlign, setTextAlign] = useState('left');

    const handleFontSizeChange = (e) => setFontSize(e.target.value);
    const toggleFontStyle = () => setFontStyle(fontStyle === 'normal' ? 'italic' : 'normal');
    const toggleFontWeight = () => setFontWeight(fontWeight === 'normal' ? 'bold' : 'normal');
    const toggleTextDecoration = () => setTextDecoration(textDecoration === 'none' ? 'underline' : 'none');
    const handleTextAlign = (align) => setTextAlign(align);

    return (
        <Grid container spacing={2} className={styles.adminAdminNoticeRegisterContainer}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>글 작성하기</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="제목을 입력하세요"
                    className={styles.adminAdminNoticeRegisterTitleInput}
                />
            </Grid>
            <Grid item container spacing={1} xs={12} alignItems="center" className={styles.adminNoticeRegisterFontControls}>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <Typography variant="body1">글꼴 크기:</Typography>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <Select
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        variant="outlined"
                        size="small"
                    >
                        {[...Array(30).keys()].map(i => (
                            <MenuItem key={i} value={i + 10}>{i + 10}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={toggleFontWeight}>
                        <FormatBoldIcon />
                    </IconButton>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={toggleFontStyle}>
                        <FormatItalicIcon />
                    </IconButton>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={toggleTextDecoration}>
                        <FormatUnderlinedIcon />
                    </IconButton>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={() => handleTextAlign('left')}>
                        <FormatAlignLeftIcon />
                    </IconButton>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={() => handleTextAlign('center')}>
                        <FormatAlignCenterIcon />
                    </IconButton>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={() => handleTextAlign('right')}>
                        <FormatAlignRightIcon />
                    </IconButton>
                </Grid>
                <Grid item className={styles.adminAdminNoticeRegisterFontControlItem}>
                    <IconButton onClick={() => handleTextAlign('justify')}>
                        <FormatAlignJustifyIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="내용을 입력하세요"
                    multiline
                    rows={8}
                    className={styles.adminAdminNoticeRegisterContentInput}
                    style={{
                        fontSize: `${fontSize}px`,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        textDecoration: textDecoration,
                        textAlign: textAlign,
                    }}
                />
                <Typography variant="body2" align="right" color="textSecondary" className={styles.adminNoticeRegisterCharCount}>0/2000</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<AttachFileIcon />}
                            className={styles.adminAdminNoticeRegisterFileAttachButton}
                        >
                            파일첨부
                            <input type="file" hidden />
                        </Button>
                        <Typography variant="body2" color="textSecondary" className={styles.adminAdminNoticeRegisterFileAttachText}>0/10MB</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdminAdminNoticeRegister;