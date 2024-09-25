import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Grid, FormControl, InputLabel } from '@mui/material';
import NestedList from '@/components/adminPage/adminSideMenu';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 CSS를 가져옴
import styles from '@/styles/adminPage/adminNotice.module.css';
import axios from 'axios';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';

// 테이블에서 페이지네이션 처리된 Notice 목록을 렌더링하는 컴포넌트
const PaginationTableAdminNotice = ({ rows, page, rowsPerPage }) => {
  const router = useRouter();
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // 행 클릭 시 해당 공지사항의 상세 페이지로 이동
  const handleRowClick = (noticeId) => {
    router.push(`/adminPage/adminNoticeDetailsPage/${noticeId}`);
  };

  // 제목이 15자 이상일 때 생략 처리 ("...")
  const truncateTitle = (title) => {
    return title.length > 15 ? `${title.slice(0, 15)}...` : title;
  };

  return (
    <TableContainer component={Paper} className={styles.noticeTableContainer}>
      <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={styles.noticeTableHeaderCell}>글 번호</TableCell>
            <TableCell align="center" className={styles.noticeTableHeaderCell}>제목</TableCell>
            <TableCell align="center" className={styles.noticeTableHeaderCell}>작성자</TableCell>
            <TableCell align="center" className={styles.noticeTableHeaderCell}>작성날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.noticeId}
              hover
              onClick={() => handleRowClick(row.noticeId)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell align="center">{row.noticeId}</TableCell>
              <TableCell align="center" className={styles.adminNoticeTitleCell}>
                {truncateTitle(row.noticeTitle)}
              </TableCell>
              <TableCell align="center">{row.user.username}</TableCell>
              <TableCell align="center" className={styles.noticeDateCell}>
                {new Date(row.noticeCreatedTime).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 30 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Admin Notice 페이지 메인 컴포넌트
const AdminNotice = () => {
  const router = useRouter();
  const [noticeData, setNoticeData] = useState([]); // 실제 데이터베이스에서 가져온 데이터
  const [searchCategory, setSearchCategory] = useState(''); // 검색 기준 카테고리 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [filteredNotices, setFilteredNotices] = useState([]); // 필터링된 공지사항 상태
  const [categoryFilter, setCategoryFilter] = useState(''); // 카테고리 필터
  const [page, setPage] = useState(0); // 현재 페이지 상태
  const [rowsPerPage, setRowsPerPage] = useState(10); // 페이지당 표시할 행 수 상태
  const [date, setDate] = useState(new Date()); // 달력에서 선택한 날짜

  // 공지사항 데이터 가져오기
  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/notice');
        const sortedData = response.data.sort(
          (a, b) => new Date(b.noticeCreatedTime) - new Date(a.noticeCreatedTime)
        );
        setNoticeData(response.data); // 가져온 데이터를 상태에 저장
        setFilteredNotices(sortedData); // 초기값 설정
      } catch (error) {
        console.error('Error fetching Notice data:', error);
      }
    };

    fetchNoticeData(); // 컴포넌트가 마운트될 때 공지사항 데이터를 가져옴
  }, []);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  // 검색어 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 필터링 처리
  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = noticeData.filter((item) => {
      const matchesCategory = categoryFilter ? item.qnaCategory === categoryFilter : true;
      const matchesSearch =
        searchCategory === 'title'
          ? item.noticeTitle.toLowerCase().includes(lowercasedFilter)
          : searchCategory === 'author'
          ? item.user.username.toLowerCase().includes(lowercasedFilter)
          : true; // 검색어 필터링

      return matchesCategory && matchesSearch;
    });
    setFilteredNotices(filteredData);
    setPage(0); // 검색 시 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // 페이지당 표시할 행 수 변경 핸들러
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(filteredNotices.length / rowsPerPage); // 총 페이지 수 계산

  return (
    <div className={styles.noticeContainer}>
      <div className={styles.noticeSidebar}>
        <NestedList />
      </div>
      <div className={styles.noticeContent}>
        <div className={styles.noticeMainContainer}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CampaignTwoToneIcon sx={{ fontSize: 60, color: '#5A8AF2', marginRight: '8px' }} />
              <h2 className={styles.noticeTitle}>𝐍𝐨𝐭𝐢𝐜𝐞𝐬</h2>
            </div>
            <Button
              variant="contained"
              className={styles.adminNoticeRegisterButton}
              onClick={() => router.push('/adminPage/adminNoticeRegisterPage')}
            >
              전체공지 등록
            </Button>
          </div>
          <hr className={styles.adminNoticeTitleDivider} />
        </div>

        {/* 달력 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Box sx={{ width: '100%' }}>
            <Calendar
              value={date}
              onChange={setDate}
              locale="en-US"
              className={styles.calendar}
            />
          </Box>
        </Box>

        {/* 공지사항 테이블 */}
        <PaginationTableAdminNotice
          rows={filteredNotices}
          page={page}
          rowsPerPage={rowsPerPage}
        />

        {/* 검색 및 페이지네이션 UI */}
        <Grid container spacing={1} alignItems="center" justifyContent="flex-end" className={styles.noticeGridContainer}>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="search-category-label">검색 기준</InputLabel>
              <Select
                labelId="search-category-label"
                id="search-category"
                value={searchCategory}
                onChange={handleCategoryChange}
                label="검색 기준"
              >
                <MenuItem value="">선택</MenuItem>
                <MenuItem value="title">제목</MenuItem>
                <MenuItem value="author">작성자</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={!searchCategory}
              className={styles.noticeGridItem}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              className={styles.noticeSearchButton}
            >
              검색
            </Button>
          </Grid>
        </Grid>

        {/* 페이지네이션 버튼 및 행 수 선택 */}
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => handleChangePage(0)}
            disabled={page === 0}
            sx={{ marginRight: 2 }}
          >
            처음
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            sx={{ marginRight: 2 }}
          >
            이전
          </Button>
          <span>{page + 1} / {totalPages}</span>
          <Button
            variant="outlined"
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= totalPages - 1}
            sx={{ marginLeft: 2 }}
          >
            다음
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleChangePage(totalPages - 1)}
            disabled={page >= totalPages - 1}
            sx={{ marginLeft: 2 }}
          >
            마지막
          </Button>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            sx={{ marginLeft: 2 }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </Box>
      </div>
    </div>
  );
};

export default AdminNotice;
