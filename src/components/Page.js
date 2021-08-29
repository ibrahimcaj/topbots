import React from 'react';

import Fetch from '../utility/Fetch';
import Avatar from '../components/Avatar';
import BootstrapTooltip from '../components/BootstrapTooltip';
import Constants from '../utility/Constants';
import '../index.css';
import '../stylesheets/List.css';

class Page extends React.Component {
    constructor () {
        super();

        this.state = {
            data: null,
            message: null
        };
    }

    fetchList = () => {
        return new Promise((resolve, reject) => {
            Fetch().then(resolve).catch(() => {
                var counter = 10;

                var interval = setInterval(() => {
                    counter -= 1;
                    this.setState({
                        message: `Couldn't load the list. Trying again in ${counter + 1} seconds...`
                    });

                    if (counter === 0) {
                        this.fetchList();
                        clearInterval(interval);
                    }
                }, 1000);
            });
        });
    }

    componentDidMount () {
        this.fetchList().then((response) => {
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

                            <BootstrapTooltip title={bot.id} interactive>
                                <div className={`botItemUsername ${bot.flags.includes('OFFLINE') ? 'botOffline' : ''}`} style={{ textDecoration: bot.flags.includes('OFFLINE') ? 'line-through' : 'none' }}>{bot.username}</div>
                            </BootstrapTooltip>
                            
                            <div className={`botItemDiscriminator ${bot.flags.includes('OFFLINE') ? 'botOffline' : ''}`}>#{bot.discriminator || '0000'}</div>
                            {bot.flags.length > 0 ?
                                <div className="botItemFlags">
                                    {Object.keys(Constants.FLAGS).filter((key) => bot.flags.includes(key)).map((key, index) => {
                                        var flag = Constants.FLAGS[key];
                                        
                                        return (
                                            <BootstrapTooltip title={flag.title} key={index}>
                                                <span>{flag.value}</span>
                                            </BootstrapTooltip>
                                        );
                                    })} 
                                </div>
                            : null}
                        </div>

                        <div className="botItemServers">{bot.servers.toLocaleString()} servers</div>

                        <div>
                            <BootstrapTooltip title="Invite">
                                <div className="botItemButton" onClick={() => window.open(`https://discord.com/api/oauth2/authorize?client_id=${bot.client}&permissions=0&scope=bot%20applications.commands`, '_blank')}>
                                    <svg width="30" height="30" className="botItemButtonIcon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 0H12V13H0V18H12V30H17V18H30V13H17V0Z"/>
                                    </svg>
                                </div>
                            </BootstrapTooltip>
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
                        <div className="botListLoading">
                            {this.state.message || 'Loading the list... Please wait.'}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Page;
