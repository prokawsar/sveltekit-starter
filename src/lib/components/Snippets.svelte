<script lang="ts">
</script>

<table>
	<thead>
		<tr>
			<th>emoji</th>
			<th>description</th>
		</tr>
	</thead>

	<tbody>
		{#snippet monkey(emoji: string, description: string)}
			<tr>
				<td>{emoji}</td>
				<td>{description}</td>
			</tr>
		{/snippet}

		{@render monkey('🙈', 'see no evil')}
		{@render monkey('🙉', 'hear no evil')}
		{@render monkey('🙊', 'speak no evil')}
	</tbody>
</table>
