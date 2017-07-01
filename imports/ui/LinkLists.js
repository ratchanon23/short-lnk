import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move'

import { Links } from '../api/links'
import LinksListItem from './LinksListItem'

class LinkLists extends Component {
    constructor(props) {
        super(props)

        this.state = {
            links: []
        }
    }

    // calling once after render()
    componentDidMount() {
        console.log('didmount')
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links')
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch()
            this.setState({links})
        })
    }

    componentWillUnmount() {
        console.log('will unmount')
        this.linksTracker.stop()
    }

    renderLinksListItems() {
        const links = this.state.links

        if(links.length === 0) {
            return (
                <div className='item'>
                    <p className='item__status-message'> No Links Found </p>
                </div>
            )
        }

        return links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id)
            return (
                <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
            )
        })
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        )
    }
}

export default LinkLists