import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import styles from './ContactForm.module.scss';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    alert('Форма отправлена!');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Имя*
        <input {...register('name', { required: true })} />
        {errors.name && <span>Обязательное поле</span>}
      </label>

      <label>
        Email*
        <input
          type="email"
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
          })}
        />
        {errors.email && <span>Введите корректный email</span>}
      </label>

      <label>
        Телефон*
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask="+7 (000) 000-00-00"
              unmask={false}
              placeholder="+7 (___) ___-__-__"
            />
          )}
        />
        {errors.phone && <span>Обязательное поле</span>}
      </label>

      <label>
        Сообщение
        <textarea {...register('message')} />
      </label>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default ContactForm;
