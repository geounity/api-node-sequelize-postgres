const debug = require('debug')('geounity:network:debate')
const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.get('/', (req, res) => {
  controller
    .getDebates()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.post('/', (req, res) => {
  const { username, community, debate } = req.body
  controller
    .saveDebate(username, community, debate)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  debug(`Getting debate by ID ${id}`)
  controller
    .getDebateById(id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.post('/point-of-view', (req, res) => {
  const { name, idDebate } = req.body
  debug(`Creating point of view ${name} for debate with id ${idDebate}`)
  controller
    .createPointOfView(name, idDebate)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch (e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

module.exports = router
