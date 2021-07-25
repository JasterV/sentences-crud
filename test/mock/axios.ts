jest.mock('axios')

import axios from 'axios'

const mockAxios = axios as jest.Mocked<typeof axios>

mockAxios.create.mockReturnThis()

export { mockAxios }