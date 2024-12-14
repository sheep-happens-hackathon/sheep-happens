import { useForm } from 'react-hook-form';
import { Button } from '../button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Checkbox } from '../checkbox';

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Nazwa użytkownika nie może być pusta.' }),
  password: z.string().min(1, {
    message: 'Hasło nie może być puste.',
  }),
});

export type UserCredentials = z.infer<typeof formSchema>;

interface Props {
  onSubmit: (values: UserCredentials) => void;
}

function LoginForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'demo',
      password: 'demo',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 w-full flex flex-col max-w-[350px] mx-auto'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input placeholder='Nazwa użytkownika' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Hasło' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Zapamiętaj
          </label>
        </div>
        <Button type='submit' className='self-center px-8'>
          Zaloguj
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
