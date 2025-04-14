import Editor from "@/components/Editor"
import InputTags from "@/components/InputTags.vue"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "CreatePost",

  setup() {
    const tags = ref(["vue", "javascript"])
    const handleUpdateTags = (data) => {
      tags.value = data
      console.log(data)
    }
    return () => (
      <div>
        <div>
          <Label>Title</Label>
          <Input />
        </div>
        <div>
          <Label>Tags</Label>
          <InputTags tags={tags.value} onUpdate={handleUpdateTags} />
        </div>
        <Editor />
      </div>
    )
  },
})
