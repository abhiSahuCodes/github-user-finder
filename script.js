const $ = (selector) => document.querySelector(selector)

const el = {
    form: $('#form'),
    input: $('#username'),
    button: $('#submit'),
    message: $('#message'),
    img: $('.profileImg'),
    name: $('.span-name'),
    link: $('.portfolio a'),
    location: $('.span-location'),
    repos: $('.span-repos'),
    followers: $('.span-follower'),
    bio: $('.span-bio'),
}

const showMessage = (text, isError) => {
    if (!el.message) return
    el.message.textContent = text || ''
    el.message.classList.toggle('is-visible', Boolean(text))
    el.message.classList.toggle('is-error', Boolean(isError))
}

const setLoading = (on) => {
    el.button.disabled = Boolean(on)
    el.button.textContent = on ? 'Searching…' : 'Search'
}

const renderUser = (user) => {
    el.img.src = user.avatar_url || './vector-users-icon.webp'
    el.img.alt = user.login ? `${user.login} avatar` : 'Profile image'

    el.name.textContent = user.name || user.login || 'N/A'
    el.location.textContent = user.location || 'N/A'
    el.repos.textContent = Number.isFinite(user.public_repos) ? user.public_repos : 'N/A'
    el.followers.textContent = Number.isFinite(user.followers) ? user.followers : 'N/A'
    el.bio.textContent = user.bio || 'N/A'

    const website = (user.blog || '').trim()
    el.link.href = website || user.html_url || 'https://github.com/'
    el.link.textContent = website ? 'Website' : 'GitHub profile'
}

const onSubmit = async (e) => {
    e.preventDefault()

    const username = el.input.value.trim()
    if (!username) {
        showMessage('Enter a GitHub username to search.', true)
        el.input.focus()
        return
    }

    showMessage('Searching GitHub…')
    setLoading(true)

    try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
        if (!res.ok) {
            showMessage(res.status === 404 ? 'User not found. Check the username and try again.' : 'Could not fetch data right now. Please try again.', true)
            return
        }

        const user = await res.json()
        renderUser(user)
        showMessage('')
    } catch {
        showMessage('Network error. Please check your connection and try again.', true)
    } finally {
        setLoading(false)
    }
}

el.form.addEventListener('submit', onSubmit)
