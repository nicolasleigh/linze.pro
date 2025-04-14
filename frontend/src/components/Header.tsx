import { defineComponent } from "vue"
import { RouterLink } from "vue-router"

export default defineComponent({
  name: "Header",
  setup() {
    const activeStyle = "text-blue-500"
    return () => (
      <header class="mb-10">
        <nav class="flex gap-4 mx-auto">
          <RouterLink to="/login" class="" activeClass={activeStyle}>
            Login
          </RouterLink>
          <RouterLink to="/signup" activeClass={activeStyle}>
            Signup
          </RouterLink>
          <RouterLink to="/editor" activeClass={activeStyle}>
            Editor
          </RouterLink>
          <RouterLink to="/post/10" activeClass={activeStyle}>
            Preview
          </RouterLink>
          <RouterLink to="/posts" activeClass={activeStyle}>
            Posts
          </RouterLink>
        </nav>
      </header>
    )
  },
})
