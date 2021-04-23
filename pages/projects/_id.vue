<template>
  <div class="container">
    <div class="projects-edit">
      <div class="page-content">
        <div class="back-btn" @click="back">
          <span class="e-arrow">&lt;</span> <span class="text">Back</span>
        </div>
        <div class="project-form">
          <div class="column">
            <div class="name-wrapper">
              <form v-if="isEdit" class="edit-name" @submit.prevent="submitForm">
                <Field
                  v-model="form.name"
                  name="name"
                  type="text"
                  size="sm"
                  placeholder="Name"
                  autocomplete="autocomplete"
                  :errors="errors"
                />
                <Button size="sm">Save</Button>
              </form>
              <div v-else class="name">
                <div class="text-wrap">{{ project.name }}</div>
                <Button
                  size="sm"
                  type="button"
                  @click="isEdit = true"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="avatar-container">
              <div class="avatar">
                <img
                  v-if="project.logo_url"
                  :src="project.logo_url"
                  :alt="project.name"
                >
                <div
                  v-else
                  class="generated-image-lg"
                  :style="{ background: avatar.color }"
                >
                  {{ avatar.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Field from '~/components/Form/Field'
import Button from '~/components/Form/Button'
import generateAvatar from '~/helpers/generateAvatar'

export default {
  name: 'Project',
  components: {
    Field,
    Button
  },
  middleware ({ $auth, redirect }) {
    if (!$auth.user) {
      return redirect('/login')
    }
  },
  async asyncData ({ $axios, params }) {
    try {
      const { data } = await $axios.get(`/projects-manage/${params.id}`)
      return {
        project: data.project,
        form: { name: data.project.name }
      }
    } catch (e) {
      return { errors: e.response.data }
    }
  },
  data () {
    return {
      project: {},
      form: {},
      isEdit: false,
      requestProcessing: false,
      errors: {}
    }
  },
  computed: {
    avatar () {
      return generateAvatar(this.project.name)
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    async submitForm () {
      if (this.requestProcessing) {
        return
      }
      this.requestProcessing = true
      try {
        const { data } = await this.$axios.post('/projects-manage/update', this.form,
          {
            params: {
              id: this.project.id
            }
          })
        this.project = data.project
        this.form = { name: data.project.name }
        this.isEdit = false
      } catch (e) {
        this.errors = e.response.data.first_errors
      } finally {
        this.requestProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .projects-edit {
    margin-top: 26px;
    .page-content {
      padding: 20px 0;
      width: 615px;
      margin: auto;
      position: relative;
      .back-btn {
        position: absolute;
        padding: 10px 5px;
        color: #2975dc;
        font-weight: 700;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        top: -20px;
        left: 0;
        &:hover {
          background: #ececec;
          cursor: pointer;
          text-decoration: none;
        }
      }
      .project-form {
        position: relative;
        margin-left: auto;
        margin-right: auto;
        color: #000;
        background: #fff;
        border: 1px solid #dedede;
        display: grid;
        grid-template-columns: 1fr 100px;
        width: 615px;
        height: 193px;
        box-sizing: border-box;
        padding: 27px 36px;
        border-radius: 6px;
        .name-wrapper {
          width: 365px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 31px;
          position: relative;
          .button {
            margin-left: 20px;
          }
          .edit-name {
            display: flex;
            align-items: center;
          }
          .name {
            display: flex;
            font-size: 24px;
            line-height: 31px;
            color: #c44512;
            background-color: transparent;
            min-width: 25px;
            max-width: 314px;
            margin-right: 10px;
          }
        }
        .avatar-container {
          float: right;
          position: relative;
          .avatar {
            position: relative;
            img, .generated-image-lg {
              height: 80px;
              width: 80px;
              border-radius: 50%;
              user-select: none;
            }
            .generated-image-lg {
              overflow: hidden;
              white-space: nowrap;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #6495ed;
              text-transform: uppercase;
              font-size: 34px;
            }
          }
        }
      }
    }
  }
</style>
