import React from 'react';
import axios from 'axios';
import https from 'https';
import '../index.css';
import '../stylesheets/List.css';

class Avatar extends React.Component {
    constructor () {
        super();

        this.state = {
            data: null
        };
    }

    componentDidMount () {
        const Agent = new https.Agent({ rejectUnauthorized: false });

        axios.get(`https://cdn.discordapp.com/avatars/${this.props.bot.id}/${this.props.bot.avatar}`, { responseType: 'arraybuffer', httpsAgent: Agent }).then((response) => {
            response = 'data:image/png;base64,' + Buffer.from(response.data, 'base64').toString('base64');

            this.setState({
                data: response
            });
        });
    }

    render() {
        if (this.state.data) {
            return (
                <img className="botItemAvatar" src={this.state.data} alt={`${this.props.bot.username}#${this.props.bot.discriminator}`}></img>
            );
        } else {
            return (
                <div className="botItemAvatar"></div>
            );
        }
    }
}
export default Avatar;