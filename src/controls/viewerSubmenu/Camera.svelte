<script lang='ts'>
    import { getContext } from "svelte";
    import type { AppState } from "../../types";
import MaxFar from "./MaxFar.svelte";
    import MinNear from "./MinNear.svelte";
import Position from "./Position.svelte";
import Target from "./Target.svelte";
    import SetPositions from "./SetPositions.svelte";
let appState : AppState = getContext('appState')  

</script>

<Position></Position>
<SetPositions></SetPositions>
<Target></Target>
<MinNear></MinNear>
<MaxFar></MaxFar>
