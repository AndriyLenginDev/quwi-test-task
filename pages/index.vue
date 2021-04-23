<template>
  <div class="container">
    <div class="projects-list">
      <div class="header">
        <div class="title">
          Projects
        </div>
      </div>
      <div class="projects">
        <ProjectPreview
          v-for="project in projects"
          :project="project"
          :key="'project_' + project.id"
        />
      </div>
    </div>
  </div>
</template>
<script>

import ProjectPreview from '~/components/Project/ProjectPreview'

export default {
  name: 'Projects',
  components: { ProjectPreview },
  middleware ({ $auth, redirect }) {
    if (!$auth.user) {
      return redirect('/login')
    }
  },
  async asyncData ({ $axios }) {
    try {
      const { data } = await $axios.get('/projects-manage')
      return { projects: data.projects }
    } catch (e) {
      return { errors: e.response.data }
    }
  },
  data () {
    return {
      projects: [],
      errors: {}
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
  .projects-list {
    .header {
      width: 600px;
      margin: 15px auto;
      .title {
        user-select: none;
        margin-top: 40px;
        text-align: center;
        color: #c44512;
        font-size: 28px;
      }
    }
    .projects {
      margin: 15px auto 50px;
      width: 600px;
      position: relative;
    }
    @media(max-width: 576px) {
      padding: 10px;
      .header {
        width: 100%;
      }
      .projects {
        width: 100%
      }
    }
  }
</style>
