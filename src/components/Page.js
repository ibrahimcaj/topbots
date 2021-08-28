import React from 'react';
import '../index.css';
import '../stylesheets/List.css';

import Fetch from '../utility/Fetch';
import Avatar from '../components/Avatar';
import Constants from '../utility/Constants';

class Page extends React.Component {
    constructor () {
        super();

        this.state = {
            data: null
        };
    }

    componentDidMount () {
        Fetch().then((response) => {
            this.setState({
                data: response.data
            });
        });
    }

    render() {
        if (this.state.data) {
            var botList = this.state.data.map((bot, index) => {
                return (
                    <div className="botListItem" key={bot.id}>
                        <div className="botListInformation">
                            <Avatar bot={bot} />

                            <div className={`botItemUsername ${bot.flags.includes('OFFLINE') ? 'botOffline' : ''}`} style={{ textDecoration: bot.flags.includes('OFFLINE') ? 'line-through' : 'none' }}>{bot.username}</div>
                            <div className={`botItemDiscriminator ${bot.flags.includes('OFFLINE') ? 'botOffline' : ''}`}>#{bot.discriminator || '0000'}</div>
                            {bot.flags.length > 0 ?
                                <div className="botItemFlags">
                                    {Object.keys(Constants.FLAGS).filter((key) => bot.flags.includes(key)).map((key, index) => {
                                        var flag = Constants.FLAGS[key];
                                        
                                        return (
                                            <span title={flag.title} key={index}>{flag.value}</span>
                                        );
                                    })} 
                                </div>
                            : null}
                        </div>

                        <div className="botItemServers">{bot.servers.toLocaleString()} servers</div>

                        <div>
                            <div className="botItemButton" onClick={() => document.location.href = `https://discord.com/api/oauth2/authorize?client_id=${bot.client}&permissions=0&scope=bot%20applications.commands`}>
                                <svg width="30" height="30" className="botItemButtonIcon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 0H12V13H0V18H12V30H17V18H30V13H17V0Z"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div className="botOverlayContainer">
                            <div className="botOverlayMedal" style={{ backgroundColor: Constants.MEDAL_COLORS[index] || '#36393f' }}>
                                <p className="botOverlayMedalPosition">{index + 1}</p>
                            </div>
                        </div>
                    </div>
                );
            });

            return (
                <div className="botsList">
                    {botList}
                </div>
            );
        } else {
            return (
                <div className="botsList">
                    <div className="botListItem" style={{ justifyContent: 'center' }}>
                        <div className="botItemDiscriminator" style={{ fontSize: '15px' }}>
                            Loading the list... Please wait.
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Page;