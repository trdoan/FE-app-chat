import { Box, Divider } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'

function Footer() {
	return (
		<>
		<Divider/>
		<Box sx={{backgroundColor:"#fff	",display:"flex",justifyContent:"center",alignItems:"center",height:50,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}}>
			© 2022 Copyright: trdoan <FavoriteIcon sx={{color:"#ca2027"}}/>
		</Box>
		</>
	)
}

export default Footer