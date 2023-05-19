import React, { useEffect, useState} from 'react';
import './App.css'
import axios from 'axios';
import Recipie from "./Recipie";
import GridItems from './Recipie';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroStyle: {
    float: 'right',
     marginRight:"150px", 
     [theme.breakpoints.down('md')]: {
      marginRight: "0px",
      float: "none"
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    // flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  bcolor: {
    backgroundColor: '#333'
  }
}));
const App = () => {
    const APP_ID = "3b24d0cc";
    const APP_KEYS = "35b52cc8e5520acc64ca2639e52cc766";
    const [recipies, setRecipies] = useState([]);
    const [search, setSearch] = useState("");
    const [searchNav, setSearchNav] = useState("");
    const [query, setQuery] = useState("chicken");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    useEffect(() => {
      const getRecipies =() => {
        setLoading(true);
          axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`)
      .then(res => {
          const allRecipies = res.data.hits
        setRecipies(allRecipies);
        setLoading(false);
        // console.log(res.data.hits)
      })
      }
      getRecipies()
    }, [query]);

   

  const handleSearchChange = e =>{
    setSearch(e.target.value);
  }

  const handleSearchClick= e =>{
    e.preventDefault();
    setQuery(search)
  }
  
  const handleSearchEdit = e =>{
    setSearchNav(e.target.value);
  }

  const handleSearchPress= e =>{
    e.preventDefault();
    setQuery(searchNav)
  }
    return (
        <div>
          <AppBar position="sticky">
        <Toolbar className={classes.bcolor}>
          <Typography className={classes.title} variant="h6" noWrap>
            RECIPIE FINDER
          </Typography>
          {/* <div className={classes.search}> */}
            {/* <div className={classes.searchIcon}>
             
            </div> */}
            {/* <button onClick={handleSearchPress} style={{backgroundColor: 'transparent', color:"white", border: "none", padding: "0px 16px"}}><SearchIcon/></button>
            <InputBase
              value={searchNav} 
              onChange={handleSearchEdit}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
        </Toolbar>
      </AppBar>
      <div className="cover">
        <div className="overlay">
        <div className={classes.heroContent}>
          <Container maxWidth="sm" className= {classes.heroStyle}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Recipe Finder
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph sm-paragraph>
            <div className='sd-paragraph'>A search engine to discover your favorite foods and dishes. Find the image, recipe, and calorie information for various foods.</div>
            </Typography>
            <form className="example" onSubmit={handleSearchClick}>
              <input type="text" placeholder="Search.." name="search" className="search-bar" value={search} onChange={handleSearchChange}/>
              <button type="submit"><i className="fa fa-search"/></button>
            </form>
          </Container>
        </div>
        </div>
      </div>
      <main style={{backgroundColor:"#333"}}>
      <section style={{textAlign: "center", padding:"30px 0px 30px 0px"}}>
        <Typography component="h1" variant="h6" align="center" gutterBottom style={{color:"#e7eff2"}}>
              Search Results
        </Typography>
      </section>
                <div className="container">
                <div className="row">
                {recipies.map(recipie => (
                  <GridItems
                    keys= {recipie.recipe.label}
                    title= {recipie.recipe.label}
                    calories= {recipie.recipe.calories}
                    image= {recipie.recipe.image}
                    ingredients={recipie.recipe.ingredients}
                    dishType= {recipie.recipe.dishType}
                    loading = {loading}
                  />
                ))};    
                </div>

                </div>

      </main>
      {/* Footer */}
      <footer className={classes.footer} style={{backgroundColor:"#e7eff2"}}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          All rights reserved
        </Typography>
      </footer>
      {/* End footer */}
      </div>
    );
};

export default App;