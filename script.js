const input = document.querySelector('#username')
const submit = document.querySelector('#submit')
const profileImg = document.querySelector('.profileImg')
const nameuser = document.querySelector('.span-name')
const portfolio = document.querySelector('.portfolio a')
const locationName = document.querySelector('.span-location')
const repos = document.querySelector('.span-repos')
const follower = document.querySelector('.span-follower')
const bio = document.querySelector('.span-bio')



const submitForm = async (e) => {
    e.preventDefault();
    const value = input.value
    try {
        const response = await fetch(`https://api.github.com/users/${value}`);
        const data = await response.json();
        console.log(data)
        profileImg.src = data.avatar_url;
        nameuser.textContent = data.name || "N/A";
        portfolio.textContent = "Portfolio Link";
        portfolio.href = data.html_url;
        locationName.textContent = data.location || "N/A";
        repos.textContent = data.public_repos;
        follower.textContent = data.followers;
        bio.textContent = data.bio || "N/A";

    } catch (error) {
        console.log(error)
    }
}

submit.addEventListener('click', submitForm);