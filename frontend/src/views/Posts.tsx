import PostCard from "@/components/PostCard.vue"
import { usePosts } from "@/hooks/usePosts"
import type { Post } from "@/types/post"
import { defineComponent } from "vue"

export default defineComponent({
  name: "Posts",

  setup() {
    const { posts, error, isLoading } = usePosts()

    return () => (
      <div class="grid grid-cols-2 gap-4">
        {posts.value.map((item: Post, index: number) => {
          return (
            <div key={index}>
              <PostCard
                id={item.id}
                title={item.title}
                content={item.content}
                createdAt={item.created_at}
                updatedAt={item.updated_at}
                username={item.user.username}
                userEmail={item.user.email}
              />
            </div>
          )
        })}
      </div>
    )
  },
})
