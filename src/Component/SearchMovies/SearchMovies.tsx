import React, {ChangeEvent, FormEvent} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            '& > *': {
                marginBottom: theme.spacing(5),
                width: '75ch',
            },
        },
    }),
);

type PropsType = {
    value: string
    setValue: (value:string)=> void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    loading: boolean | undefined
}


export const SearchMovies:React.FC<PropsType> = ({value, setValue, onSubmit, loading}) => {
    const classes = useStyles();
    const changeHandlert = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(e.target.value.trim())
    }





    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
            <TextField
                // @ts-ignore
                onChange={(e) => changeHandlert(e)}
                value={value}
                id="outlined-basic"
                label="Search Movies"
                variant="outlined"
                disabled={loading}
            />
        </form>
    );
}
