'use client';

import { Box, Typography, Button, TextField, Stack, Avatar, Chip, IconButton, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useState } from 'react';

interface InvitedPerson {
  email: string;
  name?: string;
}

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

  // Invite modal state
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [invitedPeople, setInvitedPeople] = useState<InvitedPerson[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);

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

  // Invite modal handlers
  const handleAddEmail = () => {
    if (emailInput && emailInput.includes('@')) {
      const trimmedEmail = emailInput.trim().toLowerCase();
      if (!invitedPeople.some(p => p.email === trimmedEmail)) {
        setInvitedPeople([...invitedPeople, { email: trimmedEmail }]);
        setEmailInput('');
      }
    }
  };

  const handleRemoveEmail = (email: string) => {
    setInvitedPeople(invitedPeople.filter(p => p.email !== email));
  };

  const handleParseBulk = () => {
    const lines = bulkInput.split(/[\n,;]/).filter(line => line.trim());
    const newPeople: InvitedPerson[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      const emailMatch = trimmed.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (emailMatch) {
        const email = emailMatch[1].toLowerCase();
        if (!invitedPeople.some(p => p.email === email) && !newPeople.some(p => p.email === email)) {
          newPeople.push({ email });
        }
      }
    });

    setInvitedPeople([...invitedPeople, ...newPeople]);
    setBulkInput('');
    setShowBulkInput(false);
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const newPeople: InvitedPerson[] = [];

        lines.forEach((line, index) => {
          if (index === 0 && line.toLowerCase().includes('email')) return;

          const columns = line.split(',');
          const emailColumn = columns[0]?.trim();

          if (emailColumn && emailColumn.includes('@')) {
            const email = emailColumn.toLowerCase();
            if (!invitedPeople.some(p => p.email === email) && !newPeople.some(p => p.email === email)) {
              newPeople.push({ email });
            }
          }
        });

        setInvitedPeople([...invitedPeople, ...newPeople]);
      };
      reader.readAsText(file);
    }
  };

  const handleSendInvites = () => {
    // Simulate sending invites
    console.log('Sending invites to:', invitedPeople);
    setInviteModalOpen(false);
    setInvitedPeople([]);
    setEmailInput('');
    setBulkInput('');
    setShowBulkInput(false);
  };

  const handleCloseInviteModal = () => {
    setInviteModalOpen(false);
    setInvitedPeople([]);
    setEmailInput('');
    setBulkInput('');
    setShowBulkInput(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 600 }}>
          People
        </Typography>
        <Button
          variant="contained"
          size={isMobile ? 'small' : 'medium'}
          onClick={() => setInviteModalOpen(true)}
          sx={{ textTransform: 'none' }}
        >
          Invite People
        </Button>
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

      {/* Invite People Modal */}
      <Dialog
        open={inviteModalOpen}
        onClose={handleCloseInviteModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Invite People
            </Typography>
            <IconButton size="small" onClick={handleCloseInviteModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Add Individual */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
            Add People
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddEmail();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddEmail}
              startIcon={<PersonAddIcon />}
              sx={{ textTransform: 'none', minWidth: 100 }}
            >
              Add
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Bulk Actions */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>
            Or add multiple at once:
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ContentPasteIcon />}
              onClick={() => setShowBulkInput(!showBulkInput)}
              sx={{ textTransform: 'none', flex: 1 }}
            >
              Paste Emails
            </Button>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ textTransform: 'none', flex: 1 }}
            >
              Upload CSV
              <input
                type="file"
                hidden
                accept=".csv"
                onChange={handleCSVUpload}
              />
            </Button>
          </Stack>

          {/* Bulk Text Input */}
          {showBulkInput && (
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Paste emails separated by commas, semicolons, or new lines&#10;&#10;Example:&#10;john@company.com, sarah@company.com&#10;mike@external.com"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  size="small"
                  onClick={() => {
                    setBulkInput('');
                    setShowBulkInput(false);
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleParseBulk}
                  disabled={!bulkInput.trim()}
                  sx={{ textTransform: 'none' }}
                >
                  Parse & Add
                </Button>
              </Stack>
            </Box>
          )}

          {/* Invited People List */}
          {invitedPeople.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                Ready to invite ({invitedPeople.length})
              </Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {invitedPeople.map((person) => (
                    <Chip
                      key={person.email}
                      label={person.email}
                      onDelete={() => handleRemoveEmail(person.email)}
                      deleteIcon={<CloseIcon />}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseInviteModal}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSendInvites}
            disabled={invitedPeople.length === 0}
            sx={{ textTransform: 'none' }}
          >
            Send Invites ({invitedPeople.length})
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
