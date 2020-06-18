import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navigation = () => {
    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        DS Nutter's Sample Booklist
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Navigation;
