import { useLocation } from "react-router";
import { Box, Typography, Grid, Avatar, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";

const TicketDetails = () => {
    const { state } = useLocation();
    const { ticket } = state;
    console.log(ticket);
    return (
        <div>
            <Paper elevation={2} sx={{textAlign: 'left'}}>
                <Typography sx={{color: grey[700], display:"flex"}} variant="h7" margin="10px">
                    Ticket Number #{ticket.id}
                </Typography>
                <Typography sx={{color: grey[700]}} variant="h7" margin="10px">
                    Status {ticket.status}
                </Typography>
            </Paper>
            <Paper elevation={2} sx={{textAlign: 'left'}}>
                <Typography sx={{color: grey[700]}} variant="h5" margin="10px">
                    {ticket.subject}
                </Typography>
            </Paper>
            <Paper elevation={2}>
                <Grid container>
                    <Grid xs={1} sx={{textAlign:'center'}}>
                        <Avatar sx={{ bgcolor: grey[700], mx: 'auto', my: '5px'}} 
                            alt={ticket.requester} src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid xs={11}>
                        <Box>
                            <Grid container>
                                <Grid xs={6}>
                                    <Typography sx={{color: grey[700]}} textAlign="left">{ticket.requester}</Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography sx={{color: grey[700]}} textAlign="right">{(new Date(ticket.updated_at)).toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        
                        <Typography sx={{color: grey[700], height: "70vh"}} textAlign="left">
                            {ticket.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default TicketDetails;