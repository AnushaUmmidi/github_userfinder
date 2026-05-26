async function searchUser(username) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
            throw new Error("User not found");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}
searchUser("octocat");

async function getUserRepos(username) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        if (!response.ok) {
            throw new Error("Repos not found");
        }
        const repos = await response.json();
        console.log(repos);
    } catch (error) {
        console.log(error.message);
    }
}
getUserRepos("octocat");

async function getRepoDetails(owner, repo) {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!response.ok) {
            throw new Error("Repository not found");
        }
        const repoData = await response.json();
        console.log(repoData);
    } catch (error) {
        console.log(error.message);
    }
}
getRepoDetails("octocat", "Hello-World");

async function getUserStats(username) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        const stats = {
            repositories: data.public_repos,
            followers: data.followers,
            following: data.following
        };
        console.log(stats);
    } catch (error) {
        console.log(error.message);
    }
}
getUserStats("octocat");

function formatUserProfile(userData) {
    return `
    Username: ${userData.login}
    Followers: ${userData.followers}
    Following: ${userData.following}
    Public Repositories: ${userData.public_repos}
    `;
}