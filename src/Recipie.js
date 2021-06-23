import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e7eff2"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
export default function GridItems({title, calories, image, ingredients, loading}){
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return(

      <div className="col-lg-3" style={{paddingBottom: "20px"}}>
        <Card className={classes.root}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          ) : (
          <Avatar aria-label="recipe" className={classes.avatar} loading={false} style={{backgroundColor:"#e2324e"}}>
            R
          </Avatar>
            )
        }
        action={
          loading ? null : (
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
        title
          )
        }
        subheader= {loading ? <Skeleton animation="wave" height={10} width="40%" /> : Math.round(calories * 100)/100 + " calories present"}
      />
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
      <CardMedia
        className={classes.media}
        image={image}
        title= {title}
      />
      )}
      <CardContent>
      {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
        <Typography variant="body2" color="textSecondary" component="p">
          <span style={{fontWeight:"600"}}>Desription</span>:  consectetur excepteur eu occaecat. Laboris amet fugiat nulla enim non id ex amet cupidatat. Id ad quis id anim adipisicing sint sit tempor exercitation. Consequat amet elit id cillum laborum tempor Lorem aliqua tempor.
        </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          <ol>
            {ingredients.map(ingredient => (
              <li>{ingredient.text}</li>
            ))}
          </ol>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
      </div>
    );
}
// GridItems.propTypes = {
//   loading: PropTypes.bool,
// };

// export default function Facebook() {
//   return (
//     <div>
//       <Media loading />
//       <Media />
//     </div>
//   );
// }