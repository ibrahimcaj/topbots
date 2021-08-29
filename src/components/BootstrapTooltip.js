import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(() => ({
    arrow: { color: '#202225' },
    tooltip: {
        backgroundColor: '#202225',
        fontSize: '11px',
        top: '7px'
    },
}));
export default function BootstrapTooltip(props) {
    const classes = useStyles();
    return <Tooltip classes={classes} TransitionComponent={Fade} TransitionProps={{ timeout: 75 }} placement="top" arrow {...props} />
}