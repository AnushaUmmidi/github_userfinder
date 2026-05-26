// GitHub User Finder using GitHub REST API
// Import readline module to take input from user
const readline = require("readline");

// Create interface for terminal input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to Search GitHub User
async function searchUser(username) {
    try {
        // Sending GET request to GitHub API
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );
        // Check if user exists
        if (!response.ok) {
            throw new Error("User not found");
        }
        // Convert API response into JSON format
        const userData = await response.json();
        // Display user profile details
        console.log("USER PROFILE :");
        console.log("Username :", userData.login);
        console.log("Name :", userData.name);
        console.log("Followers :", userData.followers);
        console.log("Following :", userData.following);
        console.log("Public Repositories :", userData.public_repos);
        console.log("Profile URL :", userData.html_url);
        console.log("Account Created :", userData.created_at);
        // Return user data for reuse
        return userData;
    } catch (error) {
        // Display error message
        console.log("Error :", error.message);
    }
}

// Function to Get User Repositories
async function getUserRepos(username) {
    try {
        // Sending request to fetch repositories
        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        // Check for invalid response
        if (!response.ok) {
            throw new Error("Repositories not found");
        }
        // Convert response to JSON
        const repos = await response.json();
        // Display repositories
        console.log("\n========== REPOSITORIES ==========");
        // Loop through all repositories
        repos.forEach((repo, index) => {
            console.log(`${index + 1}. ${repo.name}`);
        });
    } catch (error) {
        // Display error
        console.log("Error :", error.message);
    }
}

// Function to Get Repository Details
async function getRepoDetails(owner, repo) {
    try {
        // Sending request to GitHub API
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}`
        );
        // Check if repository exists
        if (!response.ok) {
            throw new Error("Repository not found");
        }
        // Convert response into JSON
        const repoData = await response.json();
        // Display repository details
        console.log("\n========== REPOSITORY DETAILS ==========");
        console.log("Repository Name :", repoData.name);
        console.log("Full Name :", repoData.full_name);
        console.log("Forks :", repoData.forks_count);
        console.log("Default Branch :", repoData.default_branch);
        console.log("Repository URL :", repoData.html_url);
    } catch (error) {
        // Display error message
        console.log("Error :", error.message);
    }
}

// Function to Get User Statistics
async function getUserStats(username) {
    try {
        // Sending request to GitHub API
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );
        // Convert response into JSON
        const data = await response.json();
        // Create statistics object
        const stats = {
            repositories: data.public_repos,
            followers: data.followers,
            following: data.following
        };
        // Display statistics
        console.log("\n========== USER STATISTICS ==========");
        console.log(stats);
    } catch (error) {
        // Display error message
        console.log("Error :", error.message);
    }
}

// Function to Format User Profile
function formatUserProfile(userData) {
    return `
    Username : ${userData.login}
    Followers : ${userData.followers}
    Following : ${userData.following}
    Public Repositories : ${userData.public_repos}
    `;
}

// Taking Username Input from User
rl.question("Enter GitHub Username : ", async (username) => {
    // Call search user function
    await searchUser(username);
    // Call repositories function
    await getUserRepos(username);
    // Call statistics function
    await getUserStats(username);
    // Example repository details
    // First parameter = owner name
    // Second parameter = repository name
    console.log("\nExample Repository Details:");
    await getRepoDetails(username, "Hello-World");
    // Close readline interface
    rl.close();
});