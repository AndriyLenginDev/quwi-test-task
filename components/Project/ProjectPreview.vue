<template>
  <nuxt-link class="project-box" :to="url">
    <div class="project-content">
      <div class="logo">
        <div class="avatar">
          <img
            v-if="project.logo_url"
            :src="project.logo_url"
            :alt="project.name"
          >
          <div
            v-else
            class="generated-image"
            :style="{ background: avatar.color }"
          >
            {{ avatar.text }}
          </div>
        </div>
      </div>
      <div class="name text-wrap">{{ project.name }}</div>
      <div class="worker">{{ workers }}</div>
      <div class="status" :class="[status.key]">{{ status.name }}</div>
    </div>
  </nuxt-link>
</template>

<script>
import pluralize from '~/helpers/pluralize'
import generateAvatar from '~/helpers/generateAvatar'

export default {
  name: 'ProjectPreview',
  props: {
    project: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      statusMap: {
        0: {
          name: 'Inactive',
          key: ''
        },
        1: {
          name: 'Active',
          key: 'active'
        }
      }
    }
  },
  computed: {
    url () {
      return `/projects/${this.project.id}`
    },
    avatar () {
      return generateAvatar(this.project.name)
    },
    workers () {
      const { users } = this.project
      if (users && users.length) {
        return pluralize(users.length, 'worker')
      }
      return 'No workers'
    },
    status () {
      return this.statusMap[this.project.is_active] || {}
    }
  },
  methods: {},
  created () {}
}
</script>

<style lang="scss" scoped>
  .project-box {
    display: inline-block;
    margin-bottom: 6px;
    width: 100%;
    align-items: center;
    position: relative;
    color: #000;
    text-decoration: none;
    .project-content {
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid #dedede;
      padding: 25px;
      cursor: pointer;
      font-size: .9em;
      height: 90px;
      &:hover {
        background: #ececec;
        cursor: pointer;
        text-decoration: none;
      }
      .logo {
        width: 100%;
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: none;
        padding: 0;
        flex: 1;
        margin-right: 25px;
        max-width: 65px;
        .avatar {
          img, .generated-image {
            width: 51px;
            height: 51px;
            border-radius: 50%;
            user-select: none;
          }
          .generated-image {
            overflow: hidden;
            white-space: nowrap;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #6495ed;
            text-transform: uppercase;
            font-size: 21px;
          }
        }
      }
      .name {
        flex: 2;
        font-weight: 700;
        overflow: hidden;
      }
      .worker {
        flex: 0 0 130px;
        justify-content: center;
        margin-bottom: 5px;
      }
      .status {
        flex: 0 0 45px;
        display: flex;
        flex-direction: column;
        color: #777;
        text-transform: capitalize;
        margin-bottom: 5px;
        &.active {
          color: green;
        }
      }
    }
  }
</style>
