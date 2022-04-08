import React, {useEffect, useState} from 'react';
import './UsersList.scss';
import Layout from "../Layout/Layout";
import {requestUsersList} from "../../store/actions/usersAction";
import {useDispatch, useSelector} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteModal from "./DeleteModal/DeleteModal";
import ContainerHeader from "../Layout/ContainerHeader/ContainerHeader";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [rows, setRows] = useState([]);
  const [usernameSort, setUsernameSort] = useState(1);
  const usersList = useSelector(state => state.usersReducer.usersList)

  function createData(id, name, username, city, email) {
    return {id, name, username, city, email};
  }

  useEffect(() => {
    let sortedList = [...rows]
    if (usernameSort > 1) {
      sortedList.sort((a, b) => {
        if (a['username'] < b['username']) {
          return usernameSort === 2 ? -1 : 1;
        }
        if (a['username'] > b['username']) {
          return usernameSort === 2 ? 1 : -1;
        }
        return 0;
      });
    } else {
      if (usersList) {
        sortedList.sort((a, b) => {
          if (a['id'] > b['id']) {
            return 1;
          }
          if (a['id'] < b['id']) {
            return -1;
          }
          return 0;
        });
      }
    }
    setRows(sortedList)
  }, [usernameSort])

  useEffect(() => {
    if (usersList) {
      let sortedList = []
      usersList.map(el => {
        sortedList.push(createData(el.id, el.name, el.username, el.address.city, el.email))
      })

      setRows(sortedList)
    }
  }, [usersList])

  useEffect(() => {
    if (!usersList)
      dispatch(requestUsersList())
  }, [])

  return (
    <Layout>
      <DeleteModal open={open} id={deleteId} setOpen={setOpen} setId={setDeleteId}/>
      <div className="usersList">
        <ContainerHeader>
          User list
          <NavLink to="/add"><Button variant="contained" sx={{float: 'right'}}> Add new</Button></NavLink>
        </ContainerHeader>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell
                  align="center"
                  sx={{cursor: 'pointer'}}
                  onClick={(e) => {
                    setUsernameSort(usernameSort === 3 ? 1 : usernameSort + 1)
                  }}>
                  Username {
                  usernameSort === 1 ? null : usernameSort === 2 ?
                    <ArrowDownwardIcon fontSize='small'/> :
                    <ArrowUpwardIcon fontSize='small'/>
                }
                </TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{textDecoration: 'none'}}
                      onClick={(e) => {
                        navigate(`/edit?id=${row.id}`)
                      }}
                    >Edit</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setOpen(true)
                        setDeleteId(row.id)
                      }}
                    >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!!usersList && usersList.length === 0 && <p className='noUsersText'>There are no users left</p>}
      </div>
    </Layout>
  )
}

export default UsersList;
