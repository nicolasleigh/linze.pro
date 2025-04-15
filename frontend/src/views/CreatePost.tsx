import Editor from "@/components/Editor"
import InputTags from "@/components/InputTags.vue"
import Button from "@/components/ui/button/Button.vue"
import { Label } from "@/components/ui/label"
import { defineComponent, ref, watch } from "vue"

export default defineComponent({
  name: "CreatePost",

  setup() {
    const title = ref("")
    const content = ref("")
    const tags = ref([])
    const handleUpdateTags = (data: []) => {
      tags.value = data
    }
    const handleInputChange = (e: Event) => {
      e.preventDefault()
      console.log((e.target as HTMLInputElement).value)
    }
    const wrapperStyle = "flex flex-col gap-2"

    return () => (
      <div class="flex flex-col gap-5">
        <div class={wrapperStyle}>
          <Label for="title">Title</Label>
          <input
            id="title"
            class="border rounded-md p-2 focus:outline-none"
            value={title.value}
            onInput={handleInputChange}
          />
        </div>
        <div class={wrapperStyle}>
          <Label for="tags">Tags</Label>
          <InputTags tags={tags.value} onUpdate={handleUpdateTags} />
        </div>
        <div class={wrapperStyle}>
          <Label>Content</Label>
          <Editor content={content.value} />
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </div>
    )
  },
})
