import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './zeiss-bar-styles';

const ZeissBar = ({ term, setTerm }) => {

  const classes = useStyles();

  return (
    <header>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="default"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            ZEISS MachineStream
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Machine..."
              value={term}
              onChange={e => setTerm(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default ZeissBar;
