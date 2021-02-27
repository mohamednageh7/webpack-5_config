import Heading from './component/heading/heading.js'
import AddImage from './component/imageCom/image.js'
import React from 'react'

const heading = new Heading()
const image = new AddImage()
heading.render('image')
image.render()