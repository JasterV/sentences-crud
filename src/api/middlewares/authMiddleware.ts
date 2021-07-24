import { Request, Response, NextFunction } from 'express'

export default (secret: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.header('Authorization')
        if (!authHeader) return res.status(401).json({
            success: false,
            msg: 'Unauthorized'
        })
        const token = authHeader.split('Bearer ')[1]
        if(token !== secret) {
            return res.status(401).json({
                success: false,
                msg: 'Unauthorized'
            })
        }
        return next()
    }
}