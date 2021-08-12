import {DataType} from "./MovieDetails";
import {makeStyles, Theme} from "@material-ui/core";



const useStyle =makeStyles((theme:Theme) =>({
    root: {
        marginTop: theme.spacing(4),
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
    },
    genres: {
        marginRight: theme.spacing(2)
    }
}))

export const ContentDetails: React.FC<DataType> =
    ({poster_path, title,overview,genres}) => {
    const classes = useStyle()

    return <div className={classes.root}>
        <div>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} width={200}/>
        </div>
        <div>
            <h2>{title}</h2>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            {genres.map(({id,name})=>{
                return (
                    <span
                        key={id}
                        className={classes.genres}
                    >
                        {name}
                    </span>
                )
            })}
        </div>


    </div>
}