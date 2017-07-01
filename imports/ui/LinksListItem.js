import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'

class LinksListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            justCopied: false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy)

        this.clipboard.on('success', () => {
            this.setState({justCopied: true})
            setTimeout(() => {
                this.setState({justCopied: false})
            }, 1000)

        }).on('error', () => {
            alert('not work')
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy()
    }

    renderStat() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
        let visitedMessage = null

        if(typeof(this.props.lastVisited) === 'number'){
            visitedMessage = `(visited ${ moment(this.props.lastVisited).fromNow() })`
        }

        return (
            <p className='item__message'> {this.props.visitedCount} {visitMessage} - {visitedMessage} </p>
        )
    }

    render() {
        return (
            <div className='item'>
                <h2> {this.props.url} </h2>
                <p className='item__message'> {this.props.shortUrl} </p>
                {this.renderStat()}
                <a className='button button--link button--pill' href={this.props.shortUrl} target='_blank'>
                    Visit
                </a>
                <button className='button button--pill' ref='copy' data-clipboard-text={this.props.shortUrl}> 
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button className='button button--pill' onClick={() => {Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisited: PropTypes.number
}

export default LinksListItem