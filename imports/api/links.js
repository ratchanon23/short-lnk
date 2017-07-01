import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'
import moment from 'moment'

export const Links = new Mongo.Collection('links')

if(Meteor.isServer) {
    Meteor.publish('links', function() {
        return Links.find({userID: this.userId})
    })
}

Meteor.methods({
    'links.insert'(url) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorizes')
        }

        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({url})

        Links.insert({
            _id: shortid.generate(),
            url,
            userID: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisited: null
        })
    },
    'links.setVisibility'(_id, visible) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorizes')
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({_id, visible})

        Links.update({
            _id,
            userID: this.userId
        }, {
            $set: { visible }
        })
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id})

        Links.update({_id}, {
            $set: { lastVisited: new Date().getTime() },
            $inc: { visitedCount: 1 }
        })
    }
})
