<script lang="ts">
    import {userProjects, loginWithGoogle, loginWithGithub, logout, removeProject} from "../utils/firebase";
    import {showUserPopup} from "../stores/stores";
    import ApiService from "../services/Api.service";

    const closeLoginPopup = () => {
        showUserPopup.set(false);
    }

    const selectProject = (projectId: string) => {
        const queryUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${projectId}`;
        window.history.pushState({path:queryUrl},'',queryUrl);
        ApiService.getFiles();

    }

</script>

<section>
    <div class="user-popup">
        <figure class="bg" on:click={closeLoginPopup}></figure>
        <div class="user-popup-content">
            <div class="user-popup-body">

                {#if $userProjects}
                    <div class="user-popup-projects">
                        <h3>My projects</h3>
                        {#if $userProjects.projects.length}
                            <section class="project-list">
                                {#each $userProjects.projects.filter(x => !!x.name) as project}
                                    <section class="project">
                                        <figure class="project-name" on:click={() => selectProject(project.id)}>{project.name}</figure>
                                        <section class="project-actions">
                                            <button on:click={() => removeProject(project.id)}>
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </section>
                                    </section>
                                {/each}
                            </section>
                        {:else}
                            <section class="no-projects">
                                You don't have any projects yet
                            </section>
                        {/if}
                    </div>
                {:else}
                    <div class="user-popup-projects">
                        <h3>Keep track of your projects</h3>
                        <section class="no-projects">
                            It's easy to lose the IDs of your projects. Log in with Google or Github and never lose them again.
                            <br />
                            <br />
                            <b style="color: #ea0000;">Projects with no activity are deleted after a few months.</b>
                            You should be moving to <a class="underline font-bold" href="https://github.com/nsjames/fuckyea" target="_blank">FuckYea</a> once you are done prototyping here.
                        </section>

                        <div class="mt-6"></div>

                    </div>

                {/if}

                <div class="user-popup-buttons">
                    {#if !$userProjects}
                        <button class="user-popup-button" on:click={loginWithGithub}>
                            <i class="fab fa-github mr-2"></i>
                            Login with Github
                        </button>
                        <button class="user-popup-button" on:click={loginWithGoogle}>
                            <i class="fab fa-google mr-2"></i>
                            Login with Google
                    </button>
                    {:else}
                        <button class="user-popup-button" on:click={logout}>
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Log out
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>

</section>

<style lang="scss">
    .user-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999999999999;
    }

    .user-popup .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1;
    }

    .user-popup-content {
        width: 300px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .user-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .user-popup-title {
        margin: 0;
        color: #242424;
    }

    .user-popup-close {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #242424;
    }

    .user-popup-body {
        padding: 10px;
    }

    .user-popup-buttons {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .user-popup-button {
        padding: 10px;
        border: none;
        border-radius: 50px;
        background-color: #050505;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }

    .user-popup-projects {
        margin-bottom: 10px;

        h3 {
            color: black;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }

        .project-list {
            max-height: 200px;
            overflow-y: auto;
            width: 100%;
            scrollbar-width: none;

            .project {
                margin-top: 5px;
                font-size: 13px;
                padding: 5px 5px 5px 10px;
                border-radius: 4px;
                border: 1px solid #2d2d2d;
                color: #242424;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .no-projects {
            color: #242424;
            font-size: 11px;
            margin-top: 10px;
        }

        .project-name {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        .project-actions {
            align-self: flex-end;

            button {
                padding: 5px 10px;
                margin-left: 10px;
                border: none;
                border-radius: 5px;
                background-color: #ff0000;
                color: white;
                cursor: pointer;
            }
        }
    }

    .user-popup-projects ul {
        list-style: none;
        padding: 0;
    }
</style>
