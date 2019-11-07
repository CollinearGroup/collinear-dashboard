const CreateMessage = document.querySelector('.CreateMessage')
CreateMessage.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = CreateMessage.querySelector('.title').value
  const description = CreateMessage.querySelector('.description').value
  const event_date = CreateMessage.querySelector('.event_date').value
  const msg_closing = CreateMessage.querySelector('.msg_closing').value
  const effective_date = CreateMessage.querySelector('.effective_date').value
  const expiration_date = CreateMessage.querySelector('.expiration_date').value
  post('/createMessage', { title, description, event_date, msg_closing, effective_date, expiration_date })
})

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
