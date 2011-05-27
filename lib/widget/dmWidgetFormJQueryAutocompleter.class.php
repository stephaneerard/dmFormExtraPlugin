<?php
class dmWidgetFormJQueryAutocompleter extends sfWidgetFormJQueryAutocompleter
{
	/**
	 * Configures the current widget.
	 *
	 * @param array $options     An array of options
	 * @param array $attributes  An array of default HTML attributes
	 *
	 * @see sfWidgetForm
	 */
	protected function configure($options = array(), $attributes = array())
	{
		$this->addOption('dispatcher');
		$this->addOption('response');

		parent::configure($options, $attributes);
	}


	public function render($name, $value = null, $attributes = array(), $errors = array())
	{
		$visibleValue = $this->getOption('value_callback') ? call_user_func($this->getOption('value_callback'), $value) : $value;

		if(!dm::isCli())
		{
			$this->name = $name;
			$this->value = $value;
			$this->attributes = $attributes;
			$this->errors = $errors;
			
			$dispatcher = $this->getOption('dispatcher');
			if(!$dispatcher)
			{
				$dispatcher = dmContext::getInstance()->getEventDispatcher(); 
			}
			$dispatcher->connect('layout.filter_config', array($this, 'listenToLayoutFilterConfigEvent'));
		}

		
		$response = $this->getOption('response');
		if(!$response) $response = dmContext::getInstance()->getResponse();
		$response->addJavascript('/sfFormExtraPlugin/js/jquery.autocompleter.js');
		$response->addJavascript('/dmFormExtraPlugin/js/dmFormAutocomplete.js');
		
		$response->addStylesheet('/sfFormExtraPlugin/css/jquery.autocompleter.css');
		
		return 
		$this->renderTag('input', array('type' => 'hidden', 'name' => $name, 'value' => $value))
		.
		$this->renderTag('input', array_merge(array('type' => $this->getOption('type'), 'name' => 'autocomplete_' . $name, 'value' => $visibleValue), $attributes))
		
		;
		
	}


	public function listenToLayoutFilterConfigEvent($event, $value)
	{
		if(!isset($value['autocomplete']))
		{
			$value['autocomplete'] = array();
		}

		$value['autocomplete'][$this->generateId('autocomplete_'.$this->name)] = array(
			'id' => $this->generateId('autocomplete_'.$this->name),
			'url' => $this->getOption('url'),
			'config' => $this->getOption('config'),
			'input' => $this->generateId($this->name)
		);

		return $value;
	}
}