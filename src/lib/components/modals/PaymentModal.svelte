<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
	// import Loader from "$lib/components/shared/Loader.svelte";
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import type {
		Stripe,
		StripeElements,
		StripeError,
		StripePaymentElement
	} from '@stripe/stripe-js';
	import { loadStripe } from '@stripe/stripe-js';
	import type { User } from '@supabase/supabase-js';
	import { getContext, onMount } from 'svelte';

	interface Props {
		onclose?: () => void;
	}

	let { onclose }: Props = $props();
	const user = getContext('user') as User;
	const options = {
		theme: 'stripe'
	};

	let stripe: Stripe | null;
	let elements: StripeElements;
	let elementsLoading = $state(true);
	let paymentElement: StripePaymentElement;
	let paymentElementContainer: HTMLElement;
	let paymentProcessing = $state(false);
	let paymentSuccess = $state(false);
	let paymentError: StripeError | null = $state(null);

	const handleLoadStripe = async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);
		const response = await fetch('/api/createPaymentIntent', {
			method: 'post',
			body: JSON.stringify({ customer: user.email })
		});

		const stripeIntent = await response.json();
		if (stripe) {
			elements = stripe.elements({ clientSecret: stripeIntent.clientSecret, ...options });
			paymentElement = elements.create('payment', {
				layout: 'tabs'
			});
			paymentElement.mount(paymentElementContainer);
			paymentElement.on('ready', () => {
				elementsLoading = false;
			});
		}
	};

	onMount(() => {
		handleLoadStripe();
		return () => {
			resetPaymentState();
		};
	});

	const setError = (message: string) => {
		paymentError = {
			message,
			type: 'invalid_request_error'
		};
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (paymentProcessing || elementsLoading) return;
		if (stripe === null) {
			setError('Something went wrong, please try again');
			return;
		}

		resetPaymentState();
		paymentProcessing = true;
		const formStatus = await elements.submit();
		if (formStatus.error) {
			paymentProcessing = false;
			return;
		}

		// As we have no trial preiod, we can directly confirmPayment
		const paymentIntentResult = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: $page.url.origin + '/dashboard'
			},
			redirect: 'if_required'
		});
		paymentProcessing = false;

		if (paymentIntentResult.error) {
			paymentError = paymentIntentResult.error;
			return;
		}
		paymentSuccess = true;
		setTimeout(() => {
			goto('/dashboard');
		}, 3000);
		paymentElement.clear();
	};

	const resetPaymentState = () => {
		paymentProcessing = false;
		paymentSuccess = false;
		paymentError = null;
	};

	const close = () => {
		resetPaymentState();
		paymentElement?.clear();
		onclose?.();
	};
</script>

<h2 class="py-5 text-center font-semibold">Complete your purchase</h2>

<div class="flex w-full flex-col gap-4">
	<form onsubmit={handleSubmit} class="flex w-full flex-col gap-5">
		{#if paymentProcessing}
			<div class="flex w-full items-center justify-center">
				<!-- <Loader /> -->
				Loading...
			</div>
		{/if}

		{#if paymentError}
			<div class="flex w-full items-center justify-center">
				<p data-testid="payment-error" class="text-center text-lg font-semibold text-red-500">
					{paymentError.message}
				</p>
			</div>
		{/if}

		{#if paymentSuccess}
			<div class="flex w-full items-center justify-center">
				<p data-testid="payment-succeeded" class="text-center text-lg font-semibold text-green-500">
					Payment succeeded! Redirecting...
				</p>
			</div>
		{/if}

		<div class="w-full" bind:this={paymentElementContainer}></div>
		<Button
			variant="secondary"
			data-testid="upgrade"
			type="submit"
			class=""
			disabled={paymentSuccess || elementsLoading}
		>
			{#if paymentProcessing}
				<span class="loading loading-spinner"></span>
				Processing...
			{:else if paymentSuccess}
				Payment succeeded
			{:else}
				Upgrade
			{/if}
		</Button>
	</form>
</div>
