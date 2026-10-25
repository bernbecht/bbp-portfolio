'use client';

import { cn } from '@/lib/cn';
import { useId, useState } from 'react';

type ComponentName = 'Button' | 'Text field' | 'Feedback banner';
type ButtonEmphasis = 'Primary' | 'Secondary' | 'Quiet';
type ButtonSize = 'Small' | 'Medium' | 'Large';
type FieldState = 'Default' | 'Help' | 'Error' | 'Disabled';
type BannerTone = 'Information' | 'Success' | 'Warning' | 'Error';

const components: readonly ComponentName[] = ['Button', 'Text field', 'Feedback banner'];

const focusClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function ControlGroup({
  label,
  options,
  value,
  onChange,
}: Readonly<{
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}>): React.ReactNode {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                focusClasses,
                selected
                  ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200'
                  : 'border-subtle bg-background text-secondary hover:border-strong',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ButtonPreview(): React.ReactNode {
  const [emphasis, setEmphasis] = useState<ButtonEmphasis>('Primary');
  const [size, setSize] = useState<ButtonSize>('Medium');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const sizeClasses: Record<ButtonSize, string> = {
    Small: 'min-h-9 px-3 text-sm',
    Medium: 'min-h-11 px-4 text-sm',
    Large: 'min-h-12 px-5 text-base',
  };
  const emphasisClasses: Record<ButtonEmphasis, string> = {
    Primary: 'bg-indigo-700 text-white hover:bg-indigo-800',
    Secondary: 'border border-subtle bg-background text-foreground hover:bg-surface',
    Quiet: 'bg-transparent text-indigo-800 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950',
  };

  return (
    <>
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-subtle bg-background p-8">
        <button
          type="button"
          disabled={disabled || loading}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
            focusClasses,
            sizeClasses[size],
            emphasisClasses[emphasis],
          )}
        >
          {loading ? (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
          ) : null}
          {loading ? 'Saving' : 'Save changes'}
        </button>
      </div>
      <div className="space-y-5">
        <ControlGroup
          label="Emphasis"
          options={['Primary', 'Secondary', 'Quiet']}
          value={emphasis}
          onChange={(value) => setEmphasis(value as ButtonEmphasis)}
        />
        <ControlGroup
          label="Size"
          options={['Small', 'Medium', 'Large']}
          value={size}
          onChange={(value) => setSize(value as ButtonSize)}
        />
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-secondary">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={loading}
              onChange={(event) => setLoading(event.target.checked)}
              className="size-4 accent-indigo-700 dark:accent-indigo-400"
            />
            Loading
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
              className="size-4 accent-indigo-700 dark:accent-indigo-400"
            />
            Disabled
          </label>
        </div>
      </div>
    </>
  );
}

function TextFieldPreview(): React.ReactNode {
  const [state, setState] = useState<FieldState>('Default');
  const inputId = useId();
  const messageId = useId();
  const error = state === 'Error';

  return (
    <>
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-subtle bg-background p-8">
        <div className="w-full max-w-sm">
          <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-foreground">
            Team name
          </label>
          <input
            id={inputId}
            disabled={state === 'Disabled'}
            aria-invalid={error}
            aria-describedby={state === 'Default' || state === 'Disabled' ? undefined : messageId}
            defaultValue={error ? '' : 'Design systems'}
            className={cn(
              'min-h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground disabled:cursor-not-allowed disabled:bg-surface-hover disabled:text-muted',
              focusClasses,
              error ? 'border-red-600 dark:border-red-400' : 'border-strong',
            )}
          />
          {state === 'Help' ? (
            <p id={messageId} className="mt-2 text-sm text-secondary">
              This name is visible to everyone in your workspace.
            </p>
          ) : null}
          {error ? (
            <p id={messageId} className="mt-2 text-sm font-medium text-red-700 dark:text-red-200">
              Enter a team name.
            </p>
          ) : null}
        </div>
      </div>
      <ControlGroup
        label="State"
        options={['Default', 'Help', 'Error', 'Disabled']}
        value={state}
        onChange={(value) => setState(value as FieldState)}
      />
    </>
  );
}

function BannerPreview(): React.ReactNode {
  const [tone, setTone] = useState<BannerTone>('Information');
  const styles: Record<BannerTone, string> = {
    Information: 'border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-950 dark:text-blue-200',
    Success: 'border-emerald-200 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200',
    Warning: 'border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950 text-amber-950 dark:text-amber-200',
    Error: 'border-red-200 dark:border-red-600 bg-red-50 dark:bg-red-950 text-red-950 dark:text-red-200',
  };
  const messages: Record<BannerTone, string> = {
    Information: 'A new component version is available.',
    Success: 'Your changes were published successfully.',
    Warning: 'Review breaking changes before publishing.',
    Error: 'The component could not be published.',
  };

  return (
    <>
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-subtle bg-background p-8">
        <div role={tone === 'Error' ? 'alert' : 'status'} className={cn('w-full max-w-lg rounded-lg border p-4', styles[tone])}>
          <p className="font-semibold">{tone}</p>
          <p className="mt-1 text-sm">{messages[tone]}</p>
        </div>
      </div>
      <ControlGroup
        label="Tone"
        options={['Information', 'Success', 'Warning', 'Error']}
        value={tone}
        onChange={(value) => setTone(value as BannerTone)}
      />
    </>
  );
}

export default function ComponentLibraryDemo(): React.ReactNode {
  const [activeComponent, setActiveComponent] = useState<ComponentName>('Button');

  return (
    <section aria-labelledby="component-demo-title" className="mb-12 overflow-hidden rounded-xl border border-subtle bg-surface shadow-sm">
      <div className="border-b border-subtle bg-inverse px-5 py-4 text-on-inverse sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-inverse-muted">Interactive reconstruction</p>
        <h2 id="component-demo-title" className="mt-1 text-xl font-semibold">Component workbench</h2>
      </div>

      <div className="border-b border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950 px-5 py-4 text-sm leading-relaxed text-amber-950 dark:text-amber-200 sm:px-6">
        <strong>About this demo:</strong> Recreated from memory to demonstrate my design decisions and implementation approach. It is not a production screenshot and contains no proprietary code, data, or assets.
      </div>

      <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label="Components" className="border-b border-subtle bg-background p-3 lg:border-b-0 lg:border-r">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">Components</p>
          <div className="flex gap-1 overflow-x-auto lg:flex-col">
            {components.map((component) => (
              <button
                key={component}
                type="button"
                aria-current={activeComponent === component ? 'page' : undefined}
                onClick={() => setActiveComponent(component)}
                className={cn(
                  'shrink-0 rounded-md px-3 py-2 text-left text-sm font-medium',
                  focusClasses,
                  activeComponent === component
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200'
                    : 'text-secondary hover:bg-surface-hover',
                )}
              >
                {component}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-w-0 p-5 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Preview</p>
                <h3 className="mt-1 text-2xl font-semibold text-foreground">{activeComponent}</h3>
              </div>
              {activeComponent === 'Button' ? <ButtonPreview /> : null}
              {activeComponent === 'Text field' ? <TextFieldPreview /> : null}
              {activeComponent === 'Feedback banner' ? <BannerPreview /> : null}
            </div>

            <aside className="space-y-4 rounded-lg border border-subtle bg-background p-4 text-sm">
              <div>
                <h3 className="font-semibold text-foreground">Fixed by the system</h3>
                <ul className="mt-2 space-y-1.5 text-secondary">
                  <li>Semantic color roles</li>
                  <li>Keyboard and focus behavior</li>
                  <li>State communication</li>
                  <li>Spacing and type scale</li>
                </ul>
              </div>
              <div className="border-t border-subtle pt-4">
                <h3 className="font-semibold text-foreground">Configurable by product</h3>
                <ul className="mt-2 space-y-1.5 text-secondary">
                  <li>Content and labels</li>
                  <li>Supported composition</li>
                  <li>Emphasis and size</li>
                  <li>Contextual feedback</li>
                </ul>
              </div>
              <div className="border-t border-subtle pt-4">
                <h3 className="font-semibold text-foreground">Tokens in use</h3>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 font-mono text-xs text-secondary">
                  <dt>space</dt><dd>4 / 8 / 12 / 16</dd>
                  <dt>radius</dt><dd>6 / 8</dd>
                  <dt>focus</dt><dd>indigo.500</dd>
                  <dt>type</dt><dd>14 / 16</dd>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
