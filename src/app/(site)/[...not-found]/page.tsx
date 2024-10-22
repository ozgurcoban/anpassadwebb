interface Props {
  params: Promise<{
    name: string[];
  }>;
}

export default async function NotFound(props: Props) {
  const params = await props.params;
  const path = Object.values(params).toString();

  return (
    <div className="grid h-[calc(100vh-21rem)] place-items-center">
      <h2>The /{path} is not found</h2>
    </div>
  );
}
