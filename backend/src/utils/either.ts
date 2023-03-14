export type Left<T> = {
    left: T;
    right?: never;
};

export type Right<U> = {
    left?: never;
    right: U;
};

export type Either<T, U> = NonNullable<Left<T> | Right<U>>;

export type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>;

export const unwrapEither: UnwrapEither = <T, U>({
	left,
	right,
}: Either<T, U>) => {
	if (right !== undefined && left !== undefined) {
		throw new Error(
			`Received both left and right values at runtime when opening an Either\nLeft: ${JSON.stringify(left)}\nRight: ${JSON.stringify(right)}`,
		);
		/*
     We're throwing in this function because this can only occur at runtime if something
     happens that the TypeScript compiler couldn't anticipate. That means the application
     is in an unexpected state and we should terminate immediately.
    */
	}
	if (left !== undefined) {
		return left as NonNullable<T>; // Typescript is getting confused and returning this type as `T | undefined` unless we add the type assertion
	}
	if (right !== undefined) {
		return right as NonNullable<U>;
	}
	throw new Error(
		"Received no left or right values at runtime when opening Either",
	);
};

export const isLeft = <T, U>(e: Either<T, U>): e is Left<T> => {
	return e.left !== undefined;
};

export const isRight = <T, U>(e: Either<T, U>): e is Right<U> => {
	return e.right !== undefined;
};

export const makeLeft = <T>(value: T): Left<T> => ({ left: value });

export const makeRight = <U>(value: U): Right<U> => ({ right: value });

export const tryCatch = <E, A>(f: () => A, onThrow: (e: unknown) => E): Either<E, A> => {
	try {
		return makeRight(f());
	} catch (error) {
		return makeLeft(onThrow(error));
	}
};

export const tryCatchAsync = async <E, A>(f: () => Promise<Either<E, A>>, onThrow: (e: unknown) => E): Promise<Either<E, A>> => {
	try {
		return await f();
	} catch (error) {
		return makeLeft(onThrow(error));
	}
};

export const flatMap = <E, A, B>(e: Either<E, A>, f: (a: A) => Either<E, B>): Either<E, B> => {
	if (isRight(e)) {
		const a = unwrapEither(e);
		return f(a);
	}
	return e;
};

export const flatMapAsync = async <E, A, B>(e: Either<E, A>, f: (a: A) => Promise<Either<E, B>>): Promise<Either<E, B>> => {
	if (isRight(e)) {
		const a = unwrapEither(e);
		return await f(a);
	}
	return e;
};

export const map = <E, A, B>(e: Either<E, A>, f: (a: A) => B): Either<E, B> => {
	if (isRight(e)) {
		const a = unwrapEither(e);
		return makeRight(f(a));
	}
	return e;
};

export const mapAsync = async <E, A, B>(e: Either<E, A>, f: (a: A) => Promise<B>): Promise<Either<E, B>> => {
	if (isRight(e)) {
		const a = unwrapEither(e);
		return makeRight(await f(a));
	}
	return e;
};

export const match = <E, A, B>(e: Either<E, A>, onRight: (a: A) => B, onLeft: (e: E) => B): void => {
	if (isRight(e)) {
		const result = unwrapEither(e);
		onRight(result);
		return;
	}
	if (isLeft(e)) {
		const error = unwrapEither(e);
		onLeft(error);
		return;
	}
	throw new Error("Unexpected!");
};

export const mapLeft = <E, A, B>(e: Either<E, A>, f: (er: E) => B): Either<B, A> => {
	if (isLeft(e)) {
		const err = unwrapEither(e);
		return makeLeft(f(err));
	}
	return e;
};
