<script lang="ts">
	export let game_row_size: number;

	game_row_size=5;
	$: inner_n = game_row_size * 2+1;

	function isMargin(i:number) {
		return i === 0 || i === inner_n - 1; // first or last
	}
	function isPath(i:number) {
		return i%2 === 0 && !isMargin(i);
	}
	function hasCell(i:number) {
		return !isMargin(i) && !isPath(i);
	}
	function isCell(i:number,j :number):any {
		return hasCell(i) && hasCell(j);
	}

	function handleMouseEnter(i:number,j :number):any {
		return (event) => {
			console.log(i,j, event);
		}
	}
	function handleClick(i:number,j :number):any {
		return (event) => {
			console.log(i,j, event);
		}
	}
</script>


<div class="rowContainer">
	{#each Array.from({length:inner_n}, (_, i) => inner_n - i -1) as y}
		<div
			class='columnContainer'
			class:rowMargin='{isMargin(y)}'
			class:rowPath='{isPath(y)}'
			class:row='{hasCell(y)}'
		>
			{#each Array.from({length:inner_n}, (_, i) => i)  as _, x}
				<div
					class:columnMargin='{isMargin(x)}'
					class:columnPath='{isPath(x)}'
					class:column='{hasCell(x)}'
					class:cell='{isCell(y,x)}'
					on:mouseenter={handleMouseEnter(y,x)}
					on:click={handleClick(y,x)}
				>
					{#if isCell(y,x)}
						<div class='circle'></div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>


<style type="text/css">

/* grid layout */
.rowContainer {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
.row{
	flex: 1 auto;
}
.rowPath{
	flex: 0.2 auto;
}
.rowMargin{
	flex: 0.3 auto;
}

.columnContainer {
	display: flex;
	flex-direction: row;
	width: 100%;
}
.column{
	flex: 1 auto;
}
.cell{
	display: flex;
}
.columnPath {
	flex: 0.2 auto;
}
.columnMargin{
	flex: 0.3 auto;
}


/* color */
.cell {
	background-color: rgb(161,142,128);
}
.rowPath, .columnPath, .rowMargin :not(.columnMargin), .columnMargin{
	background-color: rgb(177,160,146);
}
.rowContainer>.columnContainer:first-child>:first-child{
	border-radius: 100% 0 0 0;
}
.rowContainer>.columnContainer:first-child>:last-child{
	border-radius: 0 100% 0 0;
}
.rowContainer>.columnContainer:last-child>:last-child{
	border-radius: 0 0 100% 0;
}
.rowContainer>.columnContainer:last-child>:first-child{
	border-radius: 0 0 0 100%;
}

.circle {
	margin: auto;
  border-radius: 50%;
  /* font-size: 50%; */
	height: 90%;
	width: 90%;
  color:red;
  text-align: center;
  background: #000;
	display: none;
}
.cell:hover .circle{
	display:block;
}

</style>
