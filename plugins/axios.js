import config from '~/config'

const { AUTH } = config

export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (AUTH.UNAUTHORIZED_STATUSES.includes(error.response.status)) {
      redirect('/login')
    }
  })
}
