'use client';

import { Box, Typography, Button, TextField, Stack, Avatar, Chip, IconButton, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const peopleData = [
  { id: 1, name: 'Michael Garvey', email: 'michael@timesekr.com', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@company.com', role: 'Member', status: 'Active' },
  { id: 3, name: 'John Smith', email: 'john@company.com', role: 'Member', status: 'Active' },
  { id: 4, name: 'Alice Johnson', email: 'alice@company.com', role: 'Member', status: 'Pending' },
  { id: 5, name: 'Bob Williams', email: 'bob@external.com', role: 'Member', status: 'Pending' },
];

export default function PeopleTab({ isMobile = false }: { isMobile?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortColumn, setSortColumn] = useState<'name' | 'email' | 'role' | 'status'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const filteredAndSortedPeople = peopleData
    .filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           person.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || person.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesRole = roleFilter === 'all' || person.role.toLowerCase() === roleFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesRole;
    })
    .sort((a, b) => {
      const aVal = a[sortColumn].toLowerCase();
      const bVal = b[sortColumn].toLowerCase();
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  const handleSort = (column: 'name' | 'email' | 'role' | 'status') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, person: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedPerson(person);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPerson(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 600 }}>
          People
        </Typography>
        <Button variant="contained" size={isMobile ? 'small' : 'medium'}>Invite People</Button>
      </Box>

      {/* Search and Filters */}
      <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name or email..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, minWidth: isMobile ? '100%' : 'auto' }}>
          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 120 }}
            label="Status"
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            sx={{ minWidth: 140 }}
            label="Role"
          >
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="administrator">Administrator</MenuItem>
            <MenuItem value="member">Member</MenuItem>
          </TextField>
        </Box>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f9fafb' }}>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'name'}
                  direction={sortColumn === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Name</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'email'}
                  direction={sortColumn === 'email' ? sortDirection : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Email</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'role'}
                  direction={sortColumn === 'role' ? sortDirection : 'asc'}
                  onClick={() => handleSort('role')}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Role</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'status'}
                  direction={sortColumn === 'status' ? sortDirection : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Status</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedPeople.map((person) => (
              <TableRow key={person.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: person.role === 'Administrator' ? 'primary.main' : '#64748b', width: 36, height: 36 }}>
                      {person.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{person.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{person.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={person.role}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      bgcolor: person.role === 'Administrator' ? '#e0e7ff' : '#f3f4f6',
                      color: person.role === 'Administrator' ? '#4f46e5' : '#64748b',
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={person.status}
                    size="small"
                    color={person.status === 'Active' ? 'success' : 'warning'}
                    sx={{ height: 24, fontSize: '0.75rem', fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, person)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit Role</MenuItem>
        <MenuItem onClick={handleMenuClose}>Send Message</MenuItem>
        {selectedPerson?.status === 'Pending' && (
          <MenuItem onClick={handleMenuClose}>Resend Invite</MenuItem>
        )}
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Remove</MenuItem>
      </Menu>
    </Box>
  );
}
