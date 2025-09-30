import {RequestHandler, Router} from 'express'
import { createNote } from '../controllers/createNode'
import { authorization } from '../middlewares/authorization'
import { deleteNote } from '../controllers/deleteNote'
import { getNotes } from '../controllers/getNotes'
export const noteRouter = Router()

noteRouter.post('/', authorization, createNote as RequestHandler)
noteRouter.delete('/:id', authorization, deleteNote)
noteRouter.get('/:id', authorization, getNotes)