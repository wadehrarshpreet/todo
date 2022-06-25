<script>
  import Delete from 'svelte-material-icons/Delete.svelte';
  import Checkbox from 'components/Checkbox.svelte';
  import Animate from 'components/Animate.svelte';
  import { deleteTask, invertTaskDoneStatus } from 'helper/tasks';
  import { slide } from 'svelte/transition';

  export let tasks = [];
  export let isPast = false;
  const showDeleteOption = {};
  let isSliding = false;
</script>

<div>
  {#each tasks as task (task.id)}
    <div class="py-3 px-2 overflow-x-hidden" transition:slide|local>
      <Animate
        direction="left"
        stiffness="1"
        damping="1"
        momentum="0"
        willReturn={true}
        options={{
          threshX: 200, // threshold in x before event is triggered (px)
          threshY: 0, // threshold in y before event is triggered (px)
        }}
        swipeMove={() => {
          isSliding = true;
        }}
        onWillReturn={() => (isSliding = false)}
        swipeRight={event => {
          if (event.detail.initial.x > event.detail.x) {
            // swipe left to delete
            showDeleteOption[task.id] = {
              status: true,
              timeout: setTimeout(() => {
                deleteTask(task.id);
              }, 5000),
            };
          }
        }}
      >
        <div class="flex w-[200%] overflow-hidden">
          <div
            class={`p-4 bg-white shadow-md rounded-lg transition-transform w-full flex max-w-[50%] ${
              showDeleteOption[task.id] ? 'hidden' : ''
            } ${isPast && !task.done ? 'text-red-500' : 'text-primary'}`}
            style={`transform: translateX(${showDeleteOption[task.id] ? `-105%` : '0'});`}
          >
            <Checkbox
              on:click={() => {
                if (!isSliding) {
                  invertTaskDoneStatus(task.id);
                }
              }}
              disabled={isSliding}
              checked={task.done}
              className="mr-4 flex items-center cursor-pointer w-full"
            >
              <span
                class={`ml-4 bg-strikethrough bg-no-repeat bg-[position:0_-7px] bg-[length:0_100%] transition-[background-size] duration-700 ${
                  task.done ? 'bg-[length:100%_100%]' : ''
                }`}>{task.label}</span
              >
            </Checkbox>
          </div>
          <div
            class={`justify-between min-h-[56px] text-secondary transition-[max-width] delay-150 w-full items-center max-w-[50%] ${
              showDeleteOption[task.id] ? 'flex' : 'hidden'
            }`}
          >
            <div class="flex items-center font-semibold">
              <Delete size={'1.5rem'} />The task was deleted
            </div>
            <div
              on:click={() => {
                clearTimeout(showDeleteOption[task.id]?.timeout);
                showDeleteOption[task.id] = false;
              }}
              class="bg-white rounded-2xl text-primary p-3 text-sm uppercase border cursor-pointer"
            >
              Undo
            </div>
          </div>
        </div>
      </Animate>
    </div>
  {/each}
</div>
